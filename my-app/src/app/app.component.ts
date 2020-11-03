// import { TrpgservicesService } from './trpgservices.service';
import { AfterViewInit, Component, OnInit, TemplateRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from '../environments/environment';
import { CharAttributeService } from './char-attribute.service';

@Component({
  selector: 'my-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './app-component-custom.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  public title = 'TRPG Testing App';
  public userName: string;
  public charName: string;
  public newCharName: string;
  public trpgSchema: string[];
  public modalRef: BsModalRef;
  public loading: boolean;
  public jsonPath: string;

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


  public currTargetName: any;
  public currTargetValue: any;

  constructor(
    private titleService: Title,
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
    this.jsonPath = environment.JSONOBJECTPATH.trpgdata;
    if (!this.newCharName) {
      if (localStorage.getItem('newCharName')) {
        this.newCharName = localStorage.getItem('newCharName');
      }
    }

    this.httpService.get(this.jsonPath).subscribe(
      data => {
        this.trpgSchema = data as string[];	 // FILL THE ARRAY WITH DATA.
        console.log('Schema: ', this.trpgSchema);
        this.userName = this.trpgSchema.playername;
        this.charName = this.trpgSchema.character.name;
      },
      (err: HttpErrorResponse) => {
        console.log('Error: ', err.message);
      }
    );

    this.strength = 0;
    this.dexterity = 0;
    this.mind = 0;
    this.presence = 0;
    this.damage = 0;
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

  public setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }

  // tslint:disable-next-line: typedef
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public changeCharName(event): void {
    const msg = (document.getElementById('newcharname') as HTMLInputElement).value;
    console.log('New Character Name: ' + msg);
    this.newCharName = msg;
    this.prepareData(msg);
  }

  public prepareData(newcharname: string): void {
    console.log('this.FilterData' + JSON.stringify(newcharname));
    // const myNewCharName = this.trpgServices.post(this.jsonPath, newcharname);
    const myNewCharName = newcharname;
    console.log('MyNewCharName Set: ', myNewCharName);
    localStorage.setItem('newCharName', newcharname);
    this.charName = newcharname;
    this.onsubmit();
  }

  public onsubmit(): void {
    console.log('Event onSubmit: ', this.newCharName);
    this.modalRef.hide();
  }

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

  public setDamage(e: any): void {
    this.damageValue = e.target.value;
    this.checkDamageValue();
    if (this.damageValue > this.combatValue) {
      this.displayDeathNotice(`You're going really die soon!`);
    }
  }

  public displayDeathNotice(msg: string): void {
    window.alert(msg);
  }

  public checkDamageValue(): void {
    if (this.damageValue === undefined) {
      this.damageValue = 0;
    }
  }

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


}
