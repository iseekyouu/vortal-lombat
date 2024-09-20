import defaultWinSound from './audio/wins/wins.m4a';

class Fighter {
  public id: number;
  public name: string;
  public avatar: string;
  public health: number;
  public powerMin: number;
  public powerMax: number;
  public defense: number;
  public critical: number;
  public evasion: number;
  public winSound: string;


  constructor(id: number, name: string, avatar: string, {
    health = 100,
    powerMin = 5,
    powerMax = 20,
    defense = 0,
    critical = 5,
    evasion = 15,
    winSound = defaultWinSound,
  } = {}) {
    this.id = id;
    this.avatar = avatar;
    this.name = name;
    this.health = health;
    this.powerMin = powerMin;
    this.powerMax = powerMax;
    this.defense = defense;
    this.critical = critical;
    this.evasion = evasion;
    this.winSound = winSound;
  }
}

export default Fighter;