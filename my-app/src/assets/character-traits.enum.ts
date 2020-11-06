export interface TraitRequirements {
  anxious: CharacterTraitTypes.ANXIOUS,
  anxioustraitsvalues: {
    strength: CharacterTraitRequirementValues.ANXIOUS_STRENGTH,
    dexterity: CharacterTraitRequirementValues.ANXIOUS_DEXTERITY,
    mind: CharacterTraitRequirementValues.ANXIOUS_MIND,
    presence: CharacterTraitRequirementValues.ANXIOUS_PRESENCE
  }

}

export enum CharacterTraitTypes {
  ANXIOUS = 'anxious',
  ARACHNOPHOBIA = 'aracnophobia',
  ATHLETIC = 'athletic',
  CHARMING = 'charming',
  CLAUSTROPHOBIA = 'claustrophobia',
  COWARDLY = 'cowardly',
  DESENSITIZED = 'desensitized',
  DOOMSDAY_PREPPER = 'doomsday-prepper',
  FAMILIAL_BOND = 'familial-bond',
  FIT = 'fit',
  HEARING_IMPAIRED = 'hearing-impaired',
  KNOWLEDGE_JUNKIE = 'knowledge-junkie',
  LONER = 'loner',
  MARTIAL_ARTIST = 'martial-artist',
  NEAR_SIGHTED = 'near-sighted',
  OVER_WEIGHT = 'over-weight',
  UNDER_WEIGHT = 'under-weight',
  PACIFIST = 'pacifist',
  PSYCHOPATH = 'psychopath',
  RELIGIOUS = 'religious',
  SELFISH = 'selfish',
  TEMPER = 'temper',
  THANATOPHOBIA = 'thanatophobia'
}

export enum CharacterTraitRequirementValues {
  ANXIOUS_STRENGTH = 1,
  ANXIOUS_DEXTERITY = 2,
  ANXIOUS_MIND = 1,
  ANXIOUS_PRESENCE = 1
}
