import {Seq} from 'immutable';

const gens = new Seq({
  gen1: new Seq(['Red', 'Blue', 'Yellow']),
  gen2: new Seq(['Gold', 'Silver', 'Crystal']),
  gen3: new Seq(['Ruby', 'Sapphire', 'Emerald', 'FireRed', 'LeafGreen']),
  gen4: new Seq(['Diamond', 'Pearl', 'Platinum', 'HeartGold', 'SoulSilver']),
  gen5: new Seq(['Black', 'White', 'Black 2', 'White 2']),
  gen6: new Seq(['X', 'Y', 'OmegaRuby', 'AlphaSapphire']),
  gen7: new Seq(['Sun', 'Moon'])
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

export {gens, gameShort};
