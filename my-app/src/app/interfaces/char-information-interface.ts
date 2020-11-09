import { CharacterTraitTypes, CharacterTraitRequirementValues } from '../../assets/character-traits.enum';
export interface TraitRequirements {
  anxious: CharacterTraitTypes.ANXIOUS;
  anxioustraitsvalues: {
    strength: CharacterTraitRequirementValues.ANXIOUS_STRENGTH;
    dexterity: CharacterTraitRequirementValues.ANXIOUS_DEXTERITY;
    mind: CharacterTraitRequirementValues.ANXIOUS_MIND;
    presence: CharacterTraitRequirementValues.ANXIOUS_PRESENCE;
  };

}
