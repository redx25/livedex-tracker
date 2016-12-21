import {Seq} from 'immutable';

const gens = new Seq({
  1: new Seq(['Red', 'Blue', 'Yellow']),
  2: new Seq(['Gold', 'Silver', 'Crystal']),
  3: new Seq(['Ruby', 'Sapphire', 'Emerald', 'FireRed', 'LeafGreen']),
  4: new Seq(['Diamond', 'Pearl', 'Platinum', 'HeartGold', 'SoulSilver']),
  5: new Seq(['Black', 'White', 'Black 2', 'White 2']),
  6: new Seq(['X', 'Y', 'OmegaRuby', 'AlphaSapphire']),
  7: new Seq(['Sun', 'Moon'])
});

const gameShort = new Seq({
  Red: 'R',
  Blue: 'B',
  Yellow: 'Y',
  Gold: 'G',
  Silver: 'S',
  Crystal: 'C',
  Ruby: 'R',
  Sapphire: 'S',
  Emerald: 'E',
  FireRed: 'FR',
  LeafGreen: 'LG',
  Diamond: 'D',
  Pearl: 'P',
  Platinum: 'Pt',
  HeartGold: 'HG',
  SoulSilver: 'SS',
  Black: 'B',
  White: 'W',
  'Black 2': 'B2',
  'White 2': 'W2',
  X: 'X',
  Y: 'Y',
  OmegaRuby: 'OR',
  AlphaSapphire: 'AS',
  Sun: 'S',
  Moon: 'M'
});

const boxSizes = new Seq({
  1: 20,
  2: 20,
  3: 30,
  4: 30,
  5: 30,
  6: 30,
  7: 30
});

export {gens, gameShort, boxSizes};
