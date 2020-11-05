// import { CharacterAttributeTypes, CharacterAttributeSubTypes } from './char-generated-skill-rank.enum';

export interface BaseInformation {
  charname: string;
  avatar: string;
  newname: string;
}

export interface BaseTraits {
  name: string;
  requirement: string;
}

export interface BaseAttributes {
  strength: {
    value: number,
    fighting: {
      value: number;
    };
  };
}

export interface Strength {
  value: number;
}

export interface Dexterity {
  value: number;
  fighting: {
    value: number;
  };
  thievery: {
    value: number;
  };
  stealth: {
    value: number;
  };
  archery: {
    value: number;
  };
}

export interface Mind {
  value: number;
  learned: {
    value: number;
  };
  survival: {
    value: number;
  };
  perception: {
    value: number;
  };
  apothecary: {
    value: number;
  };
  power: {
    value: number;
  };
}

export interface Presence {
  intimidation: {
    value: number;
  };
  performance: {
    value: number;
  };
  manipulation: {
    value: number;
  };
  insight: {
    value: number;
  };
  power: {
    value: number;
  };
  exported: boolean;
  imported: boolean;
}

export interface CharacterCombatAttributes {
  vitality: {
    value: number;
    damage: number;
  };
  evasion: {
    value: number;
  };
  amor: {
    value: number;
    slotused: boolean;
    armortype: {
      value: string;
    };
    dexteritybonus: boolean;
  };
  alacrity: {
    value: number;
  };
  tenacity: {
    value: number;
  };
  power: {
    value: number;
  };
  skills: {
    rank: number;
  };
}

// export interface CharacterAttributes {
//   type: CharacterAttributeTypes;
//   data: any;
// }

// export interface CharacterSubAttributes {
//   type: CharacterAttributeSubTypes;
//   data: any;
// }
