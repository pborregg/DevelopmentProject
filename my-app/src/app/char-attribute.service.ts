import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as _ from 'lodash';
import { environment } from './../environments/environment';
import { TraitRequirements } from './interfaces/char-information-interface';
import { CharacterTraitRequirementValues, CharacterTraitTypes } from 'src/assets/character-traits.enum';

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
    playername: '',
    name: '',
    avatar: '',
    newname: ''
  };
  public characterSchema: string[];
  public traitLevel: number;

  public traitInterface: TraitRequirements[];
  public traitTypes: typeof CharacterTraitTypes;
  public traitReqValues: typeof CharacterTraitRequirementValues;

  constructor(
    private httpService: HttpClient
  ) {
    this.traitRequirements = this.traitRequirements.bind(this);
    this.oninitbegin();
  }

  public oninitbegin(): void {
    this.traitRequirements();
  }

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

  /**
   * @function importCharacter
   * @description imports character profile
   * @param characterpath
   * @returns boolean
   */
  public importCharacter(characterpath: string): boolean {
    let retBool = true;
    console.log('Character to Import: ', characterpath);

    retBool = this.getCharacterProfile(characterpath);

    return retBool;
  }

  /**
   * @function getCharacterProfile
   * @description retrieves the character profile
   * @param characterPath
   * @returns boolean
   */
  public getCharacterProfile(characterPath): boolean {

    let retBoolVal: boolean;

    this.httpService.get(characterPath).subscribe(
      data => {
        this.characterSchema = data as string[];	 // FILL THE ARRAY WITH DATA.
        console.log('Schema: ', this.characterSchema);
        this.characterInfo.playername = this.characterSchema.playername;
        this.characterInfo.name = this.characterSchema.character.name;
        this.characterInfo.avatar = this.characterSchema.character.avatar;
        retBoolVal = true;
        console.log('Avatar: ' + this.characterInfo.avatar);
      },
      (err: HttpErrorResponse) => {
        console.log('Error: ', err.message);
        retBoolVal = false;
      }
    );
    return retBoolVal;
  }

  /**
   * @function getCharacterPath
   * @param charname
   * @description gets the correct path for the character to import
   * @returns string
   */
  public getCharacterPath(charname: string): string {

    const self = this;
    let charPath: string;

    _.forOwn(environment, (value: any, key: any) => {

      if (value.JSONOBJECTPATH !== undefined) {
        if (value.JSONOBJECTPATH === charname) {
          charPath = value;
        }
      }

    });
    console.log('CHAR PATH: ' + charPath);
    return charPath;
  }

  /**
   *
   */
  public setTrait(trait: string): void {
    if (trait === 'ANXIOUS') {
      this.traitLevel = 1;
      // this.traitLevel = this.traitRequirements.anxioustraitsvalues.strength;
    }
  }

  public getTrait(): number {
    return this.traitLevel;
  }

  public traitRequirements(): void {
    this.traitTypes = CharacterTraitTypes;
    this.traitReqValues = CharacterTraitRequirementValues;
    console.log('Trait Reqs: ', this.traitTypes);
    console.log('Trait Reqs: ', this.traitReqValues);
    console.log('Trait Requirements: ');
  }

  public setTraitRequirement(trainreq: number): void {

  }

  public getTraitRequirement(): number {

    return 0;
  }

}
