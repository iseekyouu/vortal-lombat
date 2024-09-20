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
import Bahurinskiy from "./avatars/bahurinskiy.png";

import uncleJenyaWinSound from './audio/wins/uncle_jenya.m4a'
import andrewWinSound from './audio/wins/andrew.m4a'
import baliBoyWinSound from './audio/wins/Bali boy.m4a'
import bearDanceWinSound from './audio/wins/Bear dance.m4a'
import beastWinSound from './audio/wins/beast.m4a';
import bigBoomWinSound from './audio/wins/Big boom.m4a';
import birdmanWinSound from './audio/wins/birdman.m4a';
import desperadoWinSound from './audio/wins/disperado.m4a';
import heavyMacWinSound from './audio/wins/Heavy Mac.m4a';
import liquidmanWinSound from './audio/wins/Liquid man.m4a';
import lowHpWinSound from './audio/wins/Low hp.m4a';
import mozerattyWinSound from './audio/wins/mozeratty.m4a';
import pawervovaWinSound from './audio/wins/powevova.m4a';
import rookieWinSound from './audio/wins/Rookie.m4a';
import shaoKhivanWinSound from './audio/wins/Shoo kivan.m4a';
import specialForcesWinSound from './audio/wins/Scpecil forces.m4a';
import theBrainWinSound from './audio/wins/The brain.m4a';
import vecherniyWinSound from './audio/wins/Vecherniy.m4a';
import viktorStrongWinSound from './audio/wins/Viktor strong.m4a';
import traTaTaTaWinSound from './audio/wins/tra-tat-ta.m4a';
import gabrialWinSound from './audio/wins/gabriel.m4a';
import misterBkkWinSound from './audio/wins/Mister bak.m4a';
import alehandroWinSound from './audio/wins/Alejandro.m4a';

type FighterType = {
  name: string;
  avatar: string;
  winSound?: string;
} & Partial<Omit<Fighter, 'name' | 'avatar'>>;

const fightersRaw: FighterType[]  = [
  { avatar: Chekushkin, name: "uncle jenya", evasion: 99, winSound: uncleJenyaWinSound },
  { avatar: Gabriel, name: "gabriel", winSound: gabrialWinSound },
  { avatar: Galashichev, name: "tra-ta-ta-ta-ta", winSound: traTaTaTaWinSound },
  { avatar: Jidkevich, name: "liquidman", winSound: liquidmanWinSound },
  { avatar: Karbushev, name: "beast", winSound: beastWinSound },
  { avatar: Konkin, name: "andrew", winSound: andrewWinSound },
  { avatar: Orlov, name: "birdmen", winSound: birdmanWinSound },
  { avatar: Kuzakov, name: "bali boy", winSound: baliBoyWinSound },
  { avatar: Novoselov, name: "mozeratty", winSound: mozerattyWinSound },
  { avatar: Panov, name: "pawervova", winSound: pawervovaWinSound },
  { avatar: Ponomarenko, name: "shao khivan", health: 1000, winSound: shaoKhivanWinSound },
  { avatar: Roshupkin, name: "rookie", winSound: rookieWinSound },
  { avatar: Seregin, name: "the brain", winSound: theBrainWinSound },
  { avatar: Siratov, name: "viktor strong", winSound: viktorStrongWinSound },
  { avatar: Surodina, name: "heavy mac", winSound: heavyMacWinSound },
  { avatar: Trofimenko, name: "alehandro", winSound: alehandroWinSound },
  { avatar: Voronkov, name: "desperado", winSound: desperadoWinSound },
  { avatar: Chaykin, name: "mister bkk", winSound: misterBkkWinSound },
  { avatar: Antipin, name: "bear dance", winSound: bearDanceWinSound },
  { avatar: Borodin, name: "big boom", winSound: bigBoomWinSound },
  { avatar: Botov, name: "special forces", winSound: specialForcesWinSound },
  { avatar: Bushin, name: "vecherniy", winSound: vecherniyWinSound },
  { avatar: Bahurinskiy, name: "low hp", winSound: lowHpWinSound },
];

export default fightersRaw.map(
  (fighter, index) =>
    new Fighter(index, fighter.name, fighter.avatar, {
      evasion: fighter.evasion,
      health: fighter.health,
      winSound: fighter.winSound,
    })
);

export { Fighter };
