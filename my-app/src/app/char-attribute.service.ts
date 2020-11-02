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
        attribValue = 3 + attribnbr;
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

}
