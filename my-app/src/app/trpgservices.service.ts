import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrpgservicesService {

  public enviropath = {};

  constructor(
    private http: HttpClient
  ) {
    this.onInit();
  }

  onInit(): void {
    this.enviropath = environment.JSONOBJECTPATH;
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

  public post(url: string, requestData: any): Promise<any> {
    const options = this.attachAuthorization();
    // console.log(localStorage.getItem('token'));
    const data = { data: requestData };
    console.log('url: ', url);
    const finalData = JSON.stringify(data);
    console.log(localStorage.setItem('newCharName', finalData));

    // tslint:disable-next-line: no-shadowed-variable
    return new Promise((resolve, reject) => {
      return this.http.post<object>(url, finalData).subscribe((Response: any) => {
        console.log('response: ', Response);
        resolve(Response);
      }, (error: any) => {
        console.log('Error: ', error);
        reject(error);
      }
      );
    });
  }

}
