import { Injectable } from '@angular/core';
// import { BaseInformation,
// BaseTraits,
//   BaseAttributes,
//   Strength,
//   Dexterity,
//   Mind,
//   Presence,
//   CharacterCombatAttributes
// } from './interfaces/char-generated-skill-rank.enum';

@Injectable({
  providedIn: 'root'
})
export class CharAttributeService {

  private characterInfo = {
    name: '',
    avatar: '',
    newname: ''
  }


  constructor(
    // private baseInformation: BaseInformation,
    // private baseTraits: BaseTraits,
    // private baseAttributes: BaseAttributes,
    // private strength: Strength,
    // private dexterity: Dexterity,
    // private mind: Mind,
    // private presence: Presence,
    // private charCombatAttributes: CharacterCombatAttributes
  ) { }

  // tslint:disable-next-line: typedef
  public attributeServiceNode(attribname: string, attribnbr: number): number {

    let attribValue: number;

    console.log('Incoming attribute: ', attribname);

    switch (attribname) {
      case 'strength':
        attribValue = +3 + +attribnbr;
        break;
      default:
        break;
      case 'dexterity':
        attribValue = attribnbr;
        break;
      case 'mind':
        attribValue = attribnbr;
        break;
      case 'presence':
        attribValue = attribnbr;
    }
    return attribValue;
  }

  public setSkillRanking(rank: string): string {

    let rankvalue: string;

    switch (rank) {
      case '0':
        rankvalue = 'Untrained';
        break;
      case '1':
        rankvalue = 'Novice';
        break;
      case '2':
        rankvalue = 'Apprentice';
        break;
      case '3':
        rankvalue = 'Adept';
        break;
      case '4':
        rankvalue = 'Expert';
        break;
      case '5':
        rankvalue = 'Master';
        break;
      default:
        break;
    }
    return rankvalue;

  }

  public setRankingValueName(currenttargetname: string): string {

    let rankName: string;
    rankName = currenttargetname + 'Rankvalue';
    return rankName;
  }

  public generateSkillValue(nbr: number): number {

    let finalRetNbr: number;
    const genNbrA = Math.floor(Math.random() * 20) + 1;
    const genNbrB = Math.floor(Math.random() * 20) + 1;

    if (genNbrA < genNbrB) {
      finalRetNbr = genNbrA;
    } else {
      finalRetNbr = genNbrB;
    }
    return finalRetNbr;
  }

  public generateSkillRankValue(skillrankvalue: number): number {
    console.log('Skill Number coming in: ' + skillrankvalue);

    let finalRetVal: number;
    let untrainedVal: number;
    let otherRankVal: number;
    const genRnkNbrA = Math.floor(Math.random() * 5) + 1;
    const genRnkNbrB = Math.floor(Math.random() * 5) + 1;

    if (skillrankvalue === 0) { // UNTRAINED
      if (genRnkNbrA < genRnkNbrB) {
        untrainedVal = genRnkNbrA;
      } else {
        untrainedVal = genRnkNbrB;
      }
      finalRetVal = untrainedVal;
    }

    if (skillrankvalue > 1 && skillrankvalue < 5) {
      otherRankVal = Math.floor(Math.random() * 20) + 1;
      const result = (otherRankVal + (skillrankvalue - 1) * 2);
      finalRetVal = result;
    }

    return finalRetVal;

  }

  public setGeneratedRankValue(genbtnid: string): number {


    return 0;
  }

  // tslint:disable-next-line: ban-types
  public exportCharacter(charInfo: Object): boolean {

    let retBool = true;
    console.log('CHAR INFO: ', charInfo);

    if (!charInfo) {
      retBool = false;
    }

    return retBool;
  }

  public importCharacter(character: string): boolean {
    let retBool = true;

    console.log('Character to Import: ', character);




    return retBool;
  }

}
