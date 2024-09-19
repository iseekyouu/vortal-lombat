require("dotenv").config();
import express, { Request, Response } from "express";
import axios from "axios";
import cors from 'cors';
import Fighter from "./Fighter";

const askChatGPT = async (message: string) => {
  try {
    // Make a request to the OpenAI API
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4", // Use the desired model
        messages: [{ role: "user", content: message }], // Send user's message to ChatGPT
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Use the API key from the .env file
        },
      }
    );

    // Extract and send the response from ChatGPT back to the user
    const chatResponse = response.data.choices[0].message.content;
    return chatResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error communicating with ChatGPT:", error.response?.data);
    } else {
      console.error("Error communicating with ChatGPT:", error);
    }
    return "";
  }
};

const absurdWeaponsList = [
  "грязные трусы",
  "вяленая рыба",
  "плевок",
  "ружье деда",
  "ВИЧ-инфицированная акула",
  "BFG9000",
  "обидные оскорбления",
  "гниющий бутерброд",
  "смертельный пук",
  "освежитель воздуха с запахом кошачьей мочи",
  "спущенная шина",
  "газета с вчерашними новостями",
  "радиоактивный картофель",
  "кусочек заплесневелого сыра",
  "электрический носок",
  "водяной пистолет с кислой водой",
  "канцелярская кнопка на стуле",
  "удар тапком от бабушки",
  "невидимый кирпич",
  "кошачий коготь в носке",
];

const performRound = async (player1: Fighter, player2: Fighter) => {
  // players turn
  const p1dmg =
    player1.powerMin +
    Math.floor(Math.random() * (player1.powerMax - player1.powerMin + 1));
  const p2dmg =
    player2.powerMin +
    Math.floor(Math.random() * (player2.powerMax - player2.powerMin + 1));

  const getRandomItem = (list: string[]) =>
    list[Math.floor(Math.random() * list.length)];

  const getPrompt = (name1: string, name2: string, weapon: string) =>
    `Опиши смешно используя 1 короткое предложение. Идет драка, человек по имени ${name1} атакует человека по имени ${name2} используя в качестве оружия ${weapon}. ${name2} получает серьезные повреждения`;

  console.time("askChatGPT");
  const [p1text, p2text] = await Promise.all([
    askChatGPT(
      getPrompt(player1.name, player2.name, getRandomItem(absurdWeaponsList))
    ),
    askChatGPT(
      getPrompt(player2.name, player1.name, getRandomItem(absurdWeaponsList))
    ),
  ]);
  console.timeEnd("askChatGPT");

  return { p1dmg, p2dmg, p1text, p2text };
};

const app = express();
const port = 3092;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// A basic GET route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express with TypeScript!");
});

app.post("/fight", async (req: Request, res: Response) => {
  const { fighter1, fighter2 } = req.body;
  console.log(req.body);

  // Validate the request body
  if (!fighter1 || !fighter2) {
    return res.status(400).send("Both fighter1 and fighter2 are required");
  }

  // Create Fighter instances
  const player1 = new Fighter(fighter1.id, fighter1.name, fighter1.avatar, {
    health: fighter1.health,
    powerMin: fighter1.powerMin,
    powerMax: fighter1.powerMax,
    defense: fighter1.defense,
    critical: fighter1.critical,
    evasion: fighter1.evasion,
  });

  const player2 = new Fighter(fighter2.id, fighter2.name, fighter2.avatar, {
    health: fighter2.health,
    powerMin: fighter2.powerMin,
    powerMax: fighter2.powerMax,
    defense: fighter2.defense,
    critical: fighter2.critical,
    evasion: fighter2.evasion,
  });

  // players turn
  const round = await performRound(player1, player2);

  res.json(round);
});

app.post("/chat", async (req, res) => {
  const { message } = req.body; // Get the user's message from the request body

  return res.json({ response: await askChatGPT(message) });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
