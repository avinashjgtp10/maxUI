import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Storage } from "@ionic/storage";
@Injectable({
  providedIn: 'root'
})
export class ApiCallService {  
  // API path
  base_path = 'https://pristine-lake-clark-35296.herokuapp.com/api/v1/otp';

  constructor(private http: HttpClient, private storage:Storage) { }

   // Http Options
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  addAuthHead(head) {
		var headers = head || new Headers();
		let authToken = this.storage.get('Session_Id');
		headers.append('session_id', authToken);
		return headers;
        }
   // Handle API errors
   handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  
    // Create a new item
    generateOtp(item): Observable<String> {
      return this.http
        .post<String>(this.base_path + '/send', JSON.stringify(item), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
    }

     // Create a new item
     verifyOtp(item): Observable<String> {
      var authHeader = this.addAuthHead(this.httpOptions);
      return this.http
        .post<String>(this.base_path + '/verify', JSON.stringify(item), {headers:authHeader})
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
    }

      // Create a new item
      getCall(item): Observable<String> {
        return this.http
          .post<String>(this.base_path + '/call', JSON.stringify(item), this.httpOptions)
          .pipe(
            retry(1),
            catchError(this.handleError)
          )
      }

}
