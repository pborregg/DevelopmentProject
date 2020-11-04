export interface Information {
  charname: string;
  avatar: string;
  newname: string;
}

export interface Traits {
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

export enum CharacterAttributeTypes {
  CHARACTER_TYPE = 'character-type',
  CHARACTER_GENDER = 'character-gender',
  CHARACTER_STRENGTH = 'character-strength',
  CHARACTER_DEXERITY = 'character-dexterity',
  CHARACTER_MIND = 'character-mind',
  CHARACTER_PRESENCE = 'character-presence',
}

export enum CharacterAttributeSubTypes {
  CHARACTER_STRENGTH_FIGHTING = 'character-strength-fighting',
  CHARACTER_DEXTERITY_FIGHTING = 'character-dexterity-fighting',
  CHARACTER_DEXTERITY_THEIVERY = 'character-dexterity-theivery',
  CHARACTER_DEXTERITY_STEALTH = 'character-dexterity-stealth',
  CHARACTER_DEXTERITY_ARCHERY = 'character-dexterity-archerty',
  CHARACTER_MIND_LEARNED = 'character-mind-learned',
  CHARACTER_MIND_SURVIVAL = 'character-mind-survival',
  CHARACTER_MIND_PERCEPTION = 'character-mind-perception',
  CHARACTER_MIND_APOTHECARY = 'character-mind-apothecary',
  CHARACTER_MIND_POWER = 'character-mind-power',
  CHARACTER_PRESENCE_INTIMIDATION = 'character-mind-intimidation',
  CHARACTER_PRESENCE_PERFORMANCE = 'character-presence-performance',
  CHARACTER_PRESENCE_MANIPULATION = 'character-presence-manipulation',
  CHARACTER_PRESENCE_INSIGHT = 'character-presence-insight',
  CHARACTER_PRESENCE_POWER = 'character-presence-power'
}




