import { TrpgservicesService } from './trpgservices.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from '../environments/environment';

@Component({
  selector: 'my-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

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

  public setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }

  // tslint:disable-next-line: typedef
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public onSubmit(event): void {
    console.log('New Character Name: ' + event.target.value);
    this.newCharName = event.target.value;
    this.prepareData(this.newCharName);
  }

  public prepareData(newcharname: string): void {

    console.log('this.FilterData' + JSON.stringify(this.FilterData));
    this.loading = true;
    this.trpgServices.post(
      this.UrlsService.setAPIURl(APIURL.Surveillance_OatsException_Summary),
      this.FilterData)
      .map((response: Response) => {
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        return response.json();
      })
      .subscribe(Element => {
        this.dataset = Element;
      },
        (err: HttpErrorResponse) => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
        });
    this.loading = false;


  }
  // tslint:disable-next-line: typedef
  FilterData(arg0: any, FilterData: any) {
    throw new Error('Method not implemented.');
  }


}
