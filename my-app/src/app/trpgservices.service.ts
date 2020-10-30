import { environment } from './../environments/environment';
import { Injectable, OnInit } from '@angular/core';
import { RequestOptions } from 'http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrpgservicesService implements OnInit {

  public enviropath: string;

  constructor(
    private http: HttpClient
  ) {
    this.onInit();
  }

  onInit(): void {
    this.enviropath = environment.JSONOBJECTPATH.trpgdata;
  }

  private attachAuthorization(): void {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('HttpHeaders.ACCEPT', 'MediaType.APPLICATION_JSON_VALUE');
    // headers.append('Authorization', sessionStorage.getItem('token'));
    // console.log(localStorage.getItem('token'));

    // const options = new RequestOptions({
    //   headers,
    //   responseType: ResponseContentType.Json,
    // });

    // return options;
  }

  public post(url: string, requestData: any): Observable<any> {
    const options = this.attachAuthorization();
    // console.log(localStorage.getItem('token'));
    const Data = { data: requestData }
    console.log('Data ' + JSON.stringify(Data));
    return this.http.post(url, JSON.stringify(Data), options);


  }

}
