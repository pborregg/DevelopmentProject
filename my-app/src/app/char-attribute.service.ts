import { Injectable } from '@angular/core';

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
    }
    return attribValue;
  }

}
