import { Injectable } from '@angular/core';
import { BrowserStack } from 'protractor/built/driverProviders';

@Injectable({
  providedIn: 'root'
})
export class CharAttributeService {

  constructor() { }

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

}
