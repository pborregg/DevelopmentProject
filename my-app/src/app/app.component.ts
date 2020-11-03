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
    if (e.target.name === 'tenacity') {
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
}
