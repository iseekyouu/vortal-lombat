import Fighter from './Fighter'

const fightersRaw = [{
  avatar: 'https://www.serebii.net/pokemongo/pokemon/001.png',
  name: 'chekushkin',
},
  { 
    avatar: 'https://www.serebii.net/pokemongo/pokemon/001.png',
    name: 'chekushkin2',
  },
  {
    avatar: 'https://www.serebii.net/pokemongo/pokemon/001.png',
    name: 'chekushkin3',
  },
  {
    avatar: 'https://www.serebii.net/pokemongo/pokemon/001.png',
    name: 'chekushkin4',
  },
  {
    avatar: 'https://www.serebii.net/pokemongo/pokemon/001.png',
    name: 'chekushkin5',
  },
  {
    avatar: 'https://www.serebii.net/pokemongo/pokemon/001.png',
    name: 'chekushkin6',
  }
];

export default fightersRaw.map((fighter, index) =>
    new Fighter(index, fighter.name, fighter.avatar)
);