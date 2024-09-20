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
  { avatar: Chekushkin, name: "uncle jenya", evasion: 99 },
  { avatar: Gabriel, name: "gabriel" },
  { avatar: Galashichev, name: "tra-ta-ta-ta-ta" },
  { avatar: Jidkevich, name: "waterleha" },
  { avatar: Karbushev, name: "beast" },
  { avatar: Konkin, name: "andrew" },
  { avatar: Orlov, name: "sokolov" },
  { avatar: Kuzakov, name: "bali boy" },
  { avatar: Novoselov, name: "mozeratty" },
  { avatar: Panov, name: "pawervova" },
  { avatar: Ponomarenko, name: "shao khivan" },
  { avatar: Roshupkin, name: "rookie" },
  { avatar: Seregin, name: "the brain" },
  { avatar: Siratov, name: "viktor strong" },
  { avatar: Surodina, name: "heavy mac" },
  { avatar: Trofimenko, name: "alehandro" },
  { avatar: Voronkov, name: "desperado" },
  { avatar: Chaykin, name: "mister bkk" },
  { avatar: Antipin, name: "bear dance" },
  { avatar: Borodin, name: "big boom" },
  { avatar: Botov, name: "special forces" },
  { avatar: Bushin, name: "vecherniy" },
];

export default fightersRaw.map(
  (fighter, index) =>
    new Fighter(index, fighter.name, fighter.avatar, {
      evasion: fighter.evasion,
    })
);

export { Fighter };
