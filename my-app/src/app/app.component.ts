// import { TrpgservicesService } from './trpgservices.service';
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CharAttributeService } from './char-attribute.service';
import { environment } from './../environments/environment';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';
import { SessionStorageService } from 'angular-web-storage';
import { FilteringEventArgs, MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';
import { EmitType } from '@syncfusion/ej2-base';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';

@Component({
  selector: 'my-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './app-component-custom.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('characterlist') multiObj: MultiSelectComponent;

  public listofcharacters: string = null;
  public formData: HTMLFormElement;
  public NameObj: string[];

  public title = 'TRPG Testing App';
  public userName: string;
  public charName: string;
  public avatar: string;
  public newCharName: string;
  public characterSchema: string[];
  public modalRef: BsModalRef;
  public loading: boolean;
  public characterPath: string;

  // Base attribs
  public strength: number;
  public dexterity: number;
  public mind: number;
  public presence: number;

  // Combat attribs
  public vitality: number;
  public evasion: number;
  public armor: number;
  public alacrity: number;
  public tenacity: number;
  public power: number;
  public damageValue: any;
  public combatValue: number;

  // Skills
  public untrained: number;
  public novice: number;
  public apprentice: number;
  public adept: number;
  public expert: number;
  public master: number;

  public damage: number;

  // Ranking
  public strengthfighting: number;
  public strengthFightingRankvalue: string;
  public dexterityFighting: number;
  public dexterityFightingRankvalue: string;
  public dexterityStealth: number;
  public dexterityStealthRankvalue: string;
  public dexterityTheivery: number;
  public dexterityTheiveryRankvalue: string;
  public dexterityArchery: number;
  public dexterityArcheryRankvalue: number;
  public mindApothecary: number;
  public mindApothecaryRankvalue: string;
  public mindLearned: number;
  public mindLearnedRankvalue: string;
  public mindPerception: number;
  public mindPerceptionRankvalue: string;
  public mindPower: number;
  public mindPowerRankvalue: string;
  public mindSurvival: number;
  public mindSurvivalRankvalue: string;
  public presenceInsight: number;
  public presenceInsightRankvalue: string;
  public presenceIntimidation: number;
  public presenceIntimidationRankvalue: string;
  public presenceManipulation: number;
  public presenceManipulationRankvalue: string;
  public presencePerformance: number;
  public presencePerformanceRankvalue: string;
  public presencePower: number;
  public presencePowerRankvalue: string;
  public chest: string;
  public equipped: string;

  public currTargetName: any;
  public currTargetValue: any;
  // generated Skill and Rank Numbers
  public genNumber: number;
  public genRnkNbr: number;
  public allCharsObj: string[];
  public totalcharacters: number;
  public listOfCharacters = [];
  public filtered: any;
  public selected: any[] = [];
  public selectedCharacter: string;

  // bind the DataManager instance to dataSource property
  // public data: DataManager = new DataManager({
  //   url: '',
  //   adaptor: new ODataV4Adaptor,
  //   crossDomain: true
  // });

  // tslint:disable-next-line: ban-types
  public data: { [key: string]: Object }[] = this.sessionStorageService.get('allCharacterList');
  // maps the appropriate column to fields property
  public fields = { text: 'FirstName', value: 'EmployeeID' };
  // bind the Query instance to query property
  public query = new Query().from('characterlist').select(['FirstName', 'City', 'EmployeeID']).take(6);
  // set the placeholder to MultiSelect input
  public text = 'Select an employee';
  // sort the result items
  public sorting = 'Ascending';
  public box = 'box';
  // placeholder
  public placeholder = 'Choose a Character';
  // width of popup
  public popupHeight = 'auto';
  // height of popup
  public popupWidth = '450px';
  // Filtering
  public onFiltering: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    // frame the query based on search string with filter type
    query = (e.text !== '') ? query.where('charactername', 'startswth', e.text, true) : query;
    // pass the filter data source, filter query to updateData method
    e.updateData(this.data, query);
  }

  constructor(
    private titleService: Title,
    private sessionStorageService: SessionStorageService,
    private httpService: HttpClient,
    private charAttributeService: CharAttributeService,
    private modalService: BsModalService // ,
    // private trpgServices: TrpgservicesService
  ) {
    this.vitality = 0;
    this.evasion = 0;
    this.armor = 0;
    this.alacrity = 0;
    this.tenacity = 0;
    this.power = 0;

    // Skill Ranking
    this.untrained = 0;
    this.novice = 1;
    this.apprentice = 2;
    this.adept = 3;
    this.expert = 4;
    this.master = 5;
    this.strengthfighting = 0;

  }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.setTitle(this.title);
    this.characterPath = environment.JSONOBJECTPATH.valarian;
    if (!this.newCharName) {
      if (localStorage.getItem('newCharName')) {
        this.newCharName = localStorage.getItem('newCharName');
      }
    }

    this.httpService.get(this.characterPath).subscribe(
      data => {

        let characters = {};
        this.characterSchema = data as string[];	 // FILL THE ARRAY WITH DATA.
        this.sessionStorageService.set('currCharSchema', this.characterSchema);
        characters = this.sessionStorageService.get('currCharSchema');
        console.log('Schema: ', characters);

        this.userName = characters.playername;
        this.charName = characters.character.name;
        this.avatar = characters.character.avatar;

        console.log('Avatar: ' + this.avatar);

      },
      (err: HttpErrorResponse) => {
        console.log('Error: ', err.message);
      }
    );

    this.getAllCharacters();

    this.strength = 0;
    this.dexterity = 0;
    this.mind = 0;
    this.presence = 0;
    this.damage = 0;
    this.chest = 'Chest Armor';
    this.equipped = 'shield-gray.jpg';
  }

  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    const self = this;
    const elem = document.getElementById('newcharname');
    setTimeout(() => {
      if (elem) {
        elem.addEventListener('blur', () => {
          self.newCharName = elem.nodeValue;
        });
      }
      const btnSubmit = document.getElementById('btnSubmit');
      document.getElementById('charname').addEventListener('submit', this.onsubmit);
      if (btnSubmit !== null) {
        document.getElementById('btnSubmit').addEventListener('click', (e: Event) => {
          e.preventDefault();
        });
      }
    }, 3000);

  }

  // On Clear
  public onClear(): void {
    console.log('Selected item is removed', this.multiObj.value);
    this.multiObj.value = null;
    console.log('MultiSelect is: ', this.multiObj.value);
  }

  /**
   * @function: setTitle
   * @description: uses title service to set the title on the browser
   * @param: newTitle - string
   * @returns: nothing
   */
  public setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }

  /**
   * @function: openModal
   * @description: opens the character name change modal
   * @param: template - Template that's used to open the modal
   * @returns: nothing
   */

  // tslint:disable-next-line: typedef
  public openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  /**
   * @function: changeCharName
   * @description: changes the character's name
   * @param: event
   * @returns: nothing
   */
  public changeCharName(event: any): void {
    const msg = event.target.value;
    console.log('New Character Name: ' + msg);
    this.newCharName = msg;
    if (this.newCharName === 'Joseph') {
      this.avatar = 'joseph.png';
    } else if (this.newCharName === 'Archangel') {
      this.avatar = 'archangel.png';
    } else if (this.newCharName === 'Valarian') {
      this.avatar = 'valarian.png';
    } else {
      this.avatar = this.characterSchema.character.avatar;
    }
    this.prepareData(msg);
  }

  /**
   * @function: prepareData
   * @description: prepares the data from the DB (JSON Schema) in this case
   * @param: newcharname - string
   * @returns: nothing
   */
  public prepareData(newcharname: string): void {
    console.log('this.FilterData' + JSON.stringify(newcharname));
    // const myNewCharName = this.trpgServices.post(this.jsonPath, newcharname);
    const myNewCharName = newcharname;
    console.log('MyNewCharName Set: ', myNewCharName);
    localStorage.setItem('newCharName', newcharname);
    this.charName = newcharname;
    this.onsubmit();
  }

  /**
   * @function: onsubmit
   * @description: submits the character name change modal
   * @param: none
   * @returns: nothing
   */
  public onsubmit(): void {
    console.log('Event onSubmit: ', this.newCharName);
    this.modalRef.hide();
  }

  /**
   * @function: calcCharComputedAttribs
   * @description: calculates the computed attributes
   * @param: event
   * @returns: nothing
   */
  public calcCharComputedAttribs(e: any): void {
    let retCombatAttrVal: number;
    console.log('Event TARGET: ', e);
    console.log('Event Char Attrib incoming for: ' + e.target.name + '    ' + e.target.value);

    this.currTargetName = e.target.name;
    this.currTargetValue = e.target.value;

    retCombatAttrVal = this.charAttributeService.attributeServiceNode(e.target.name, e.target.value);

    if (e.target.name === 'strength') {
      this.combatValue = retCombatAttrVal;
      this.checkDamageValue();
      if (this.damageValue !== 0) {
        this.vitality = retCombatAttrVal - this.damageValue;
        if (this.damageValue > retCombatAttrVal) {
          this.displayDeathNotice(`You're dying, man!`);
        }
      } else {
        this.vitality = retCombatAttrVal;
      }
    }
    if (e.target.name === 'dexterity') {
      this.dexterity = retCombatAttrVal;
      this.evasion = +retCombatAttrVal + +10;
      this.armor = this.evasion;
    }
    if (e.target.name === 'armor') {

    }
    if (e.target.name === 'mind') {
      this.alacrity = +this.dexterity + +this.mind;
    }
    if (e.target.name === 'presence') {
      this.tenacity = +1 + +this.presence;
    }

  }

  /**
   * @function: calcCharComputedAttribs
   * @description: calculates the computed attributes
   * @param: event
   * @returns: nothing
   */
  public setDamage(e: any): void {
    this.damageValue = e.target.value;
    this.checkDamageValue();
    if (this.damageValue > this.combatValue) {
      this.displayDeathNotice(`You're going really die soon!`);
    }
  }

  /**
   * @function: displayDeathNotice
   * @description: displays death notice that you are DYING
   * @param: msg
   * @returns: nothing
   */
  public displayDeathNotice(msg: string): void {
    window.alert(msg);
  }

  /**
   * @function: checkDamageValue
   * @description: checks if there's a damage value for future use
   * @param: none
   * @returns: nothing
   */
  public checkDamageValue(): void {
    if (this.damageValue === undefined) {
      this.damageValue = 0;
    }
  }

  /**
   * @function: checkSkillLevel
   * @description: checks Skill Level for the character
   * @param: e: any
   * @param: parentname: string
   * @returns: boolean
   */
  public checkSkillLevel(e: any, parentname: string): boolean {

    console.log('Event: ', e);
    this.currTargetName = parentname;
    console.log('Current Target Name: ', this.currTargetName);
    console.log('Current Target Value: ', this.currTargetValue);

    console.log('Current Skill Rank Name: ', e.target.name);
    console.log('Current Skill Rank Value: ', e.target.value);

    let retVal = true;
    const elX = this.currTargetValue;
    const elY = e.target.value;

    if (elY > elX) {
      window.alert('Oops! You cannot go higher than the value of your skillset!');
      e.target.value = this.currTargetValue;
      retVal = false;
    } else {

      if (this.currTargetName === 'strength') {
        this.strengthFightingRankvalue = this.charAttributeService.setSkillRanking(elY);
      } else if (this.currTargetName === 'dexterity') {
        if (e.target.name === 'dexterityFighting') {
          this.dexterityFightingRankvalue = this.charAttributeService.setSkillRanking(elY);
        } else if (e.target.name === 'dexterityStealth') {
          this.dexterityStealthRankvalue = this.charAttributeService.setSkillRanking(elY);
        } else if (e.target.name === 'dexterityTheivery') {
          this.dexterityTheiveryRankvalue = this.charAttributeService.setSkillRanking(elY);
        }
      } else if (this.currTargetName === 'mind') {
        if (e.target.name === 'mindApothecary') {
          this.mindApothecaryRankvalue = this.charAttributeService.setSkillRanking(elY);
        } else if (e.target.name === 'mindLearned') {
          this.mindLearnedRankvalue = this.charAttributeService.setSkillRanking(elY);
        } else if (e.target.name === 'mindPerception') {
          this.mindPerceptionRankvalue = this.charAttributeService.setSkillRanking(elY);
        } else if (e.target.name === 'mindPower') {
          this.mindPowerRankvalue = this.charAttributeService.setSkillRanking(elY);
        } else if (e.target.name === 'mindSurvival') {
          this.mindSurvivalRankvalue = this.charAttributeService.setSkillRanking(elY);
        }
      } else if (this.currTargetName === 'presence') {
        if (e.target.name === 'presenceInsight') {
          this.presenceInsightRankvalue = this.charAttributeService.setSkillRanking(elY);
        } else if (e.target.name === 'presenceIntimidation') {
          this.presenceIntimidationRankvalue = this.charAttributeService.setSkillRanking(elY);
        } else if (e.target.name === 'presenceManipulation') {
          this.presenceManipulationRankvalue = this.charAttributeService.setSkillRanking(elY);
        } else if (e.target.name === 'presencePerformance') {
          this.presencePerformanceRankvalue = this.charAttributeService.setSkillRanking(elY);
        } else if (e.target.name === 'presencePower') {
          this.presencePowerRankvalue = this.charAttributeService.setSkillRanking(elY);
        }
      }

      console.log('RANK VALUE: ', e.target.name + 'Rankvalue');
    }
    return retVal;
  }

  /**
   * @function generateSkillValue
   * @description generates skill value by clicking a button
   * @param e event
   * @param skill string
   * @param rank string
   */
  public generateSkillValue(e: any, skill: string, rank: string): void {

    console.log('Event for Generating Skill Rank: ', e.target);



    if (skill === 'strength') {

      this.genNumber = this.charAttributeService.generateSkillValue(this.strength);
      console.log('Generated Skill Number: ' + this.genNumber);

      this.genRnkNbr = this.charAttributeService.generateSkillRankValue(this.strengthfighting);
      console.log('Generated Rank Number: ' + this.genRnkNbr);
    }

  }

  /**
   * @function: exportCharacter
   * @description: exports the characters current status
   * @param: none
   * @returns: nothing
   */
  public exportCharacter(event: any, charname: string): boolean {

    const charInfo = {
      name: charname,
      avatar: this.avatar,
      newname: this.newCharName,
      traits: [{
        name: '',
        requirement: ''
      }],
      baseattribs: {
        strength: {
          value: this.strength,
          fighting: {
            value: this.strengthfighting
          }
        },
        dexterity: {
          value: this.dexterity,
          fighting: {
            value: this.dexterityFighting
          },
          thievery: {
            value: this.dexterityTheivery
          },
          stealth: {
            value: this.dexterityStealth
          },
          archery: {
            value: this.dexterityArchery
          }
        },
        mind: {
          value: this.mind,
          learned: {
            value: this.mindLearned
          },
          survival: {
            value: this.mindSurvival
          },
          perception: {
            value: this.mindPerception
          },
          apothecary: {
            value: this.mindApothecaryRankvalue
          },
          power: {
            value: this.mindPower
          }
        },
        presence: {
          intimidation: {
            value: this.presenceIntimidation
          },
          performance: {
            value: this.presencePerformance
          },
          manipulation: {
            value: this.presenceManipulation
          },
          insight: {
            value: this.presenceInsight
          },
          power: {
            value: this.presencePower
          },
          exported: true,
          imported: false
        },
        combatattribs: {
          vitality: {
            value: this.vitality,
            damage: this.damageValue
          },
          evasion: {
            value: this.evasion
          },
          armor: {
            value: this.armor,
            slotused: false,
            armortype: {
              value: this.chest
            },
            dexteritybonus: false
          },
          alacrity: {
            value: 0
          },
          tenacity: {
            value: 0
          },
          power: {
            value: 0
          },
          skills: {
            rank: 0
          }
        }
      }
    };


    return this.charAttributeService.exportCharacter(charInfo);

  }

  // tslint:disable-next-line: ban-types
  /**
   * @function: importCharacter
   * @description: imports Character Object
   * @param: charToImport
   * @returns boolean | true if successful false if not
   */
  public importCharacter(event: any, charToImport: string): boolean {
    let retValBool = true;
    let charpath: string;

    charpath = this.charAttributeService.getCharacterPath(charToImport);

    if (charpath || charpath !== undefined) {
      retValBool = this.charAttributeService.importCharacter(charpath);
    } else {
      const msg = 'Character path to import does not exist!';
      console.log(msg);
      window.alert(msg);
      retValBool = false;
    }

    return retValBool;
  }

  /**
   * @function armorEquipped
   * @description equips a character with armor
   * @param event ANY
   * @returns nothing
   */
  public armorEquipped(event: any): void {

    console.log('Event Armor Equipped: ', event.target.id);

    const btnArmorYes = document.body.querySelector('#btnArmorYes') as HTMLElement;
    const btnArmorNo = document.body.querySelector('#btnArmorNo') as HTMLElement;

    if (event.target.id === 'yes') {
      this.equipped = 'shield-green.jpg';
      btnArmorYes.classList.remove('btn-secondary');
      btnArmorYes.classList.add('btn-primary');
      btnArmorNo.classList.remove('btn-primary');
      btnArmorNo.classList.add('btn-secondary');
    } else if (event.target.id === 'no') {
      this.equipped = 'shield-red.jpg';
      btnArmorYes.classList.remove('btn-primary');
      btnArmorYes.classList.add('btn-secondary');
      btnArmorNo.classList.remove('btn-secondary');
      btnArmorNo.classList.add('btn-primary');
    } else {
      this.equipped = 'shield-gray.jpg';
      btnArmorNo.classList.remove('btn-primary');
      btnArmorNo.classList.add('btn-secondary');
      btnArmorYes.classList.remove('btn-primary');
      btnArmorYes.classList.add('btn-secondary');
    }
  }

  /**
   * @function attackSkill
   * @description Sets an attack skill based on Strength or Dexterity
   * @param event ANY
   * @returns nothing
   */
  public attackSkill(event: any): void {
    console.log('Event Attack Skill: ', event.target.id);

    const btnWeaponsYes = document.body.querySelector('#btnWeaponsYes') as HTMLElement;
    const btnWeaponsNo = document.body.querySelector('#btnWeaponsNo') as HTMLElement;
    const btnWeaponsNone = document.body.querySelector('#btnWeaponsNone') as HTMLElement;


    if (event.target.id === 'strength') {
      btnWeaponsYes.classList.remove('btn-secondary');
      btnWeaponsYes.classList.add('btn-primary');
      btnWeaponsNo.classList.remove('btn-primary');
      btnWeaponsNo.classList.add('btn-secondary');
      btnWeaponsNone.classList.remove('btn-primary');
      btnWeaponsNone.classList.add('btn-secondary');
    } else if (event.target.id === 'dexterity') {
      btnWeaponsYes.classList.remove('btn-primary');
      btnWeaponsYes.classList.add('btn-secondary');
      btnWeaponsNo.classList.remove('btn-secondary');
      btnWeaponsNo.classList.add('btn-primary');
      btnWeaponsNone.classList.remove('btn-primary');
      btnWeaponsNone.classList.add('btn-secondary');
    } else {
      btnWeaponsNo.classList.remove('btn-primary');
      btnWeaponsNo.classList.add('btn-secondary');
      btnWeaponsYes.classList.remove('btn-primary');
      btnWeaponsYes.classList.add('btn-secondary');
      btnWeaponsNone.classList.remove('btn-secondary');
      btnWeaponsNone.classList.add('btn-primary');

    }

  }

  public getAllCharacters(): boolean {

    let retAllCharsBool: boolean;
    const endpoint = `${environment.ALLCHARACTERS.allcharpath}`;

    if (this.selected.length === 0) {
      this.httpService.get(endpoint).subscribe(
        data => {
          this.allCharsObj = data as string[];	 // FILL THE ARRAY WITH DATA.
          console.log('Schema: ', this.allCharsObj);
          this.totalcharacters = this.allCharsObj.characters.length;
          this.sessionStorageService.set('allCharactersList', this.allCharsObj.characters);
          retAllCharsBool = true;
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < this.allCharsObj.characters.length; i++) {
            if (this.allCharsObj.characters[i].name !== this.charName) {
              this.listOfCharacters.push(this.allCharsObj.characters[i].name);
            }
          }
          this.selected = this.listOfCharacters;
          this.sessionStorageService.set('allCharsOnly', this.listOfCharacters);
          console.log('Characters: ', this.selected);
        },
        (err: HttpErrorResponse) => {
          console.log('Error: ', err.message);
          retAllCharsBool = false;
        }
      );
      // We've done this once... just get the data.
      this.selected = this.sessionStorageService.get('allCharsOnly');
      return retAllCharsBool;
    }
    return true;
  }

  public onChange(): void {
    console.log('OnChange: ', this.selectedCharacter);
    console.log('this.selected: ', this.selected);
    // this.filtered = this.selected.filter(t => t.name === this.selected);
  }

  public importNewCharacter(): boolean {
    return true;
  }

}
