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


  constructor(id: number, name: string, avatar: string, {
    health = 100,
    powerMin = 2,
    powerMax = 10,
    defense = 0,
    critical = 5,
    evasion = 5,
  } = {}) {
    this.id = id;
    this.avatar = avatar;
    this.name = name;
    this.health = health;
    // this.powerMin = powerMin;
    this.powerMin = 30;
    // this.powerMax = powerMax;
    this.powerMax = 50;
    this.defense = defense;
    this.critical = critical;
    this.evasion = evasion;
  }
}

export default Fighter;