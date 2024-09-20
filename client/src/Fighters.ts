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
import Roshupkin from "./avatars/roshupkin.png";
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
import Gunbin from "./avatars/gunbin.png";
import Melnikov from './avatars/melnikov.png'


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

const fightersRaw: FighterType[] = [
  { avatar: Chekushkin, name: "uncle jenya", evasion: 80, powerMax: 15, health: 50, winSound: uncleJenyaWinSound }, // Lower evasion, higher max power
  { avatar: Gabriel, name: "gabriel", evasion: 16, powerMin: 7, winSound: gabrialWinSound }, // Slightly better evasion and powerMin
  { avatar: Galashichev, name: "tra-ta-ta-ta-ta", powerMax: 25, evasion: 13, winSound: traTaTaTaWinSound }, // Higher powerMax, slightly less evasion
  { avatar: Jidkevich, name: "liquidman", health: 90, evasion: 18, winSound: liquidmanWinSound }, // Lower health, better evasion
  { avatar: Karbushev, name: "beast", health: 120, evasion: 10, winSound: beastWinSound }, // Higher health, lower evasion (tougher but easier to hit)
  { avatar: Konkin, name: "andrew", evasion: 17, winSound: andrewWinSound }, // Balanced
  { avatar: Orlov, name: "birdmen", evasion: 19, health: 95, winSound: birdmanWinSound }, // Higher evasion, slightly lower health
  { avatar: Kuzakov, name: "bali boy", powerMin: 6, evasion: 12, winSound: baliBoyWinSound }, // Balanced, slight tweak in powerMin
  { avatar: Novoselov, name: "mozeratty", powerMax: 23, evasion: 14, winSound: mozerattyWinSound }, // Higher powerMax
  { avatar: Panov, name: "pawervova", health: 110, winSound: pawervovaWinSound }, // Slightly more health
  { avatar: Ponomarenko, name: "shao khivan", health: 1000, powerMin: 15, powerMax: 35, evasion: 8, winSound: shaoKhivanWinSound }, // Boss-level stats
  { avatar: Roshupkin, name: "rookie", health: 90, evasion: 16, winSound: rookieWinSound }, // Slightly weaker health, good evasion
  { avatar: Seregin, name: "the brain", powerMin: 8, evasion: 17, winSound: theBrainWinSound }, // Higher powerMin, good evasion
  { avatar: Siratov, name: "viktor strong", health: 120, evasion: 12, winSound: viktorStrongWinSound }, // Stronger health, decent evasion
  { avatar: Surodina, name: "heavy mac", health: 160, powerMax: 3, powerMin: 1, winSound: heavyMacWinSound }, // Higher health, slightly lower max power
  { avatar: Trofimenko, name: "alehandro", powerMin: 7, evasion: 14, winSound: alehandroWinSound }, // Balanced
  { avatar: Voronkov, name: "desperado", powerMax: 24, evasion: 13, winSound: desperadoWinSound }, // Higher powerMax
  { avatar: Chaykin, name: "mister bkk", evasion: 20, health: 85, winSound: misterBkkWinSound }, // High evasion, slightly lower health
  { avatar: Antipin, name: "bear dance", health: 130, evasion: 10, winSound: bearDanceWinSound }, // High health, low evasion (tank-like)
  { avatar: Borodin, name: "big boom", powerMax: 28, evasion: 8, winSound: bigBoomWinSound }, // High max power, lower evasion
  { avatar: Botov, name: "special forces", powerMin: 6, evasion: 15, winSound: specialForcesWinSound }, // Balanced, slight tweak in powerMin
  { avatar: Bushin, name: "vecherniy", health: 105, evasion: 14, winSound: vecherniyWinSound }, // Slightly more health
  { avatar: Bahurinskiy, name: "low hp", health: 75, evasion: 20, winSound: lowHpWinSound }, // Low health, very high evasion
  { avatar: Gunbin, name: "astronaut", powerMax: 23, evasion: 13 }, // Balanced
  { avatar: Melnikov, name: "sub marine", powerMin: 6, evasion: 14 }, // Balanced
];

export default fightersRaw.map(
  (fighter, index) =>
    new Fighter(index, fighter.name, fighter.avatar, {
      evasion: fighter.evasion,
      health: fighter.health,
      winSound: fighter.winSound,
      powerMax: fighter.powerMax,
      powerMin: fighter.powerMin,
    })
);

export { Fighter };
