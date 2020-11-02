import { TrpgservicesService } from './trpgservices.service';
import { AfterViewInit, Component, OnInit, TemplateRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from '../environments/environment';

@Component({
  selector: 'my-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  public title = 'TRPG Testing App';
  public userName: string;
  public charName: string;
  public newCharName: string;
  public trpgSchema: any[];
  public modalRef: BsModalRef;
  public loading: boolean;
  public jsonPath: string;

  constructor(
    private titleService: Title,
    private httpService: HttpClient,
    private modalService: BsModalService,
    private trpgServices: TrpgservicesService
  ) { }

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
    console.log('New Character Name: ' + event.target.value);
    this.newCharName = event.target.value;
    this.prepareData(this.newCharName);
  }

  public prepareData(newcharname: string): void {
    console.log('this.FilterData' + JSON.stringify(newcharname));
    const myNewCharName = this.trpgServices.post(this.jsonPath, newcharname);
    console.log('MyNewCharName Set: ', myNewCharName);
  }

  public onSubmit(e: Event): void {
    e.preventDefault();
  }



}
