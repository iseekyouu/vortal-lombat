require('dotenv').config();
import express, { Request, Response } from 'express';
import axios from 'axios';
import Fighter from './Fighter';

const askChatGPT = async (message: string) => {
  try {
    // Make a request to the OpenAI API
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4', // Use the desired model
        messages: [{ role: 'user', content: message }], // Send user's message to ChatGPT
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Use the API key from the .env file
        },
      }
    );

    // Extract and send the response from ChatGPT back to the user
    const chatResponse = response.data.choices[0].message.content;
    return chatResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error communicating with ChatGPT:', error.response?.data);
    } else {
      console.error('Error communicating with ChatGPT:', error);
    }
    return '';
  } 
}

const app = express();
const port = 3092;

// Middleware to parse JSON
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));  

// A basic GET route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express with TypeScript!');
});

app.post('/fight', (req: Request, res: Response) => {
  const { fighter1, fighter2 } = req.body;
  console.log(req.body);

  // Validate the request body
  if (!fighter1 || !fighter2) {
    return res.status(400).send('Both fighter1 and fighter2 are required');
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
  const p1dmg = player1.powerMin + Math.floor(Math.random() * (player1.powerMax - player1.powerMin + 1));
  const p2dmg = player2.powerMin + Math.floor(Math.random() * (player2.powerMax - player2.powerMin + 1));

  const p1text = 'player1 hits';
  const p2text = 'player2 hits';

  res.json({ p1dmg, p2dmg, p1text, p2text });
});

app.post('/chat', async (req, res) => {
  const { message } = req.body; // Get the user's message from the request body

  return res.json({ response: await askChatGPT(message) });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});