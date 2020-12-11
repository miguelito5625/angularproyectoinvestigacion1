import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Arduinomega2560Service {

  baseurl = environment.apiServer;


  constructor(
    private http: HttpClient
  ) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // GET
  encenderLed(): Observable<any> {
    return this.http.get<any>(this.baseurl + '/led/on')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // GET
  apagarLed(): Observable<any> {
    return this.http.get<any>(this.baseurl + '/led/off')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // GET
  getPersonTemp(): Observable<any> {
    return this.http.get<any>(this.baseurl + '/persontemp')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }
  
  // Error handling
  errorHandl(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }
 
}
