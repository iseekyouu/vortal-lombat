import Fighter from "./Fighter";
import Chekushkin from "./avatars/chekushkin.png";
import Gabriel from "./avatars/gabriel.png";
import Galashichev from "./avatars/galashichev.png";
import Jidkevich from "./avatars/jidkevich.png";
import Karbushev from "./avatars/karbushev.png";
import Konkin from "./avatars/konkin.png";
import Kuzakov from "./avatars/kuzakov.png";
import Novoselov from "./avatars/novoselov.png";
import Orlov from "./avatars/orlov.png";
import Panov from "./avatars/panov.png";
import Ponomarenko from "./avatars/ponomarenko.png";
import Roshupkin from "./avatars/roshupkin.jpeg";
import Seregin from "./avatars/seregin.png";
import Siratov from "./avatars/siratov.png";
import Surodina from "./avatars/surodina.png";
import Trofimenko from "./avatars/trofimenko.png";
import Voronkov from "./avatars/voronkov.png";
import Chaykin from "./avatars/chaykin.png";
import Antipin from "./avatars/antipin.png";
import Borodin from "./avatars/borodin.png";
import Botov from "./avatars/botov.png";
import Bushin from "./avatars/bushin.png";

const fightersRaw = [
  { avatar: Chekushkin, name: "chekushkin", evasion: 99 },
  { avatar: Gabriel, name: "gabriel" },
  { avatar: Galashichev, name: "galashichev" },
  { avatar: Jidkevich, name: "jidkevich" },
  { avatar: Karbushev, name: "karbushev" },
  { avatar: Konkin, name: "konkin" },
  { avatar: Orlov, name: "orlov" },
  { avatar: Kuzakov, name: "kuzakov" },
  { avatar: Novoselov, name: "novoselov" },
  { avatar: Panov, name: "panov" },
  { avatar: Ponomarenko, name: "ponomarenko" },
  { avatar: Roshupkin, name: "roshupkin" },
  { avatar: Seregin, name: "seregin" },
  { avatar: Siratov, name: "siratov" },
  { avatar: Surodina, name: "surodina" },
  { avatar: Trofimenko, name: "trofimenko" },
  { avatar: Voronkov, name: "voronkov" },
  { avatar: Chaykin, name: "chaykin" },
  { avatar: Antipin, name: "antipin" },
  { avatar: Borodin, name: "borodin" },
  { avatar: Botov, name: "botov" },
  { avatar: Bushin, name: "bushin" },
];

export default fightersRaw.map(
  (fighter, index) =>
    new Fighter(index, fighter.name, fighter.avatar, {
      evasion: fighter.evasion,
    })
);

export { Fighter };
