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
  base_path = 'https://pristine-lake-clark-35296.herokuapp.com/api/v1';

  constructor(private http: HttpClient, private storage: Storage) { }

  getTokenData() {
    return new Promise((resolve, reject) => {
      this.storage.get('User_Data').then((data: any) => {
        if (data && data.token) {
          resolve(data.token);
        } else {
          reject();
        }
      }).catch((err) => {
        reject();
      })
    });

  }
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
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


  // Generate Otp
  generateOtp(item): Observable<JSON> {
    return this.http
      .post<JSON>(this.base_path + '/otp/send', JSON.stringify(item), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Verify Otp
  verifyOtp(item, sessionId: string): Observable<String> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('session_id', sessionId);
    console.log('headers', headers);
    return this.http
      .post<String>(this.base_path + '/otp/verify', JSON.stringify(item), { headers: headers })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Get Call
  getCall(item): Observable<String> {
    return this.http
      .post<String>(this.base_path + '/otp/call', JSON.stringify(item), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Store Profile
  storeProfileData(data): Observable<JSON> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http
      .post<JSON>(this.base_path + '/client', JSON.stringify(data), { headers: headers })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Update Profile
  updateProfileData(data, c_id): Observable<JSON> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http
      .put<JSON>(this.base_path + `/client/${c_id}`, JSON.stringify(data), { headers: headers })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Get Profile
  getProfileData(c_id): Observable<JSON> {
    return this.http
      .get<JSON>(this.base_path + `/client/${c_id}`)
      .pipe(
        catchError(this.handleError)
      )
  }


  // Get available Food Data
  getAvailableFoodData(): Observable<JSON> {
    return this.http
      .get<JSON>(this.base_path + `/calorieItems`)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Store Food Data
  storeFoodData(data, c_id): Observable<JSON> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http
      .post<JSON>(this.base_path + `/calorieTracker/${c_id}`, JSON.stringify(data), { headers: headers })
      .pipe(
        catchError(this.handleError)
      )
  }


  // Get User Food Data
  getUserFoodData(toDate, fromDate, c_id): Observable<JSON> {
    return this.http
      .get<JSON>(this.base_path + `/calorieTracker/${c_id}?toDate=${toDate}&fromDate=${fromDate}`)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Search User Food Data
  searchUserFoodData(searchKey): Observable<JSON> {
    return this.http
      .get<JSON>(this.base_path + `/calorieItems?search=${searchKey}`)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Update Food Item
  updateFoodItem(data, c_id, co_id): Observable<JSON> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http
      .put<JSON>(this.base_path + `/updateTracker/${c_id}/${co_id}`, JSON.stringify(data), { headers: headers })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Delete Food Item
  deleteFoodItem(c_id, co_id): Observable<JSON> {
    return this.http
      .delete<JSON>(this.base_path + `/deleteCaloreConsumption/${c_id}/${co_id}`)
      .pipe(
        catchError(this.handleError)
      )
  }


  // Search Handwash Tracker Data
  searchHandwashTrackerData(data): Observable<JSON> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http
      .post<JSON>(this.base_path + `/handwashtracker/search/`, JSON.stringify(data), { headers: headers })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Store Handwash Tracker Data
  storeHandwashTrackerData(data): Observable<JSON> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http
      .post<JSON>(this.base_path + `/handwashtracker/addupdate/`, JSON.stringify(data), { headers: headers })
      .pipe(
        catchError(this.handleError)
      )
  }

  post(payload, endponit): Observable<JSON> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http
      .post<JSON>(this.base_path + endponit, JSON.stringify(payload), { headers: headers })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Get My Training Data
  getMyTrainingData(category, plan, c_id): Observable<JSON> {
    return this.http
      .get<JSON>(this.base_path + `/mytraining/getData/${category}/${plan}/${c_id}`)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Post Getting Started Data
  gettingStartedData(data): Observable<JSON> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http
      .post<JSON>(this.base_path + `/mytraining/createTraining`, JSON.stringify(data), { headers: headers })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Get My Training Dashboard Data
  getMyTrainingDashboardData(c_id): Observable<JSON> {
    return this.http
      .get<JSON>(this.base_path + `/mytraining/getTrainingData/${c_id}`)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Post Workout Schedule
  workoutSchedule(data): Observable<JSON> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http
      .post<JSON>(this.base_path + `/mytraining/workoutSchedule`, JSON.stringify(data), { headers: headers })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Get My Training Overview Data
  getMyTrainingOverviewData(c_id): Observable<JSON> {
    return this.http
      .get<JSON>(this.base_path + `/mytraining/getTrainingWorkoutSchedule/${c_id}`)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Get My Day-wise Video Data
  getDayWiseData(day, week, c_id): Observable<JSON> {
    return this.http
      .get<JSON>(this.base_path + `/mytraining/getDayVideo/${c_id}/${day}/${week}`)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Get My Diet Plan Details
  getDietPlan(c_id): Observable<JSON> {
    return this.http
      .get<JSON>(this.base_path + `/dietplan/${c_id}`)
      .pipe(
        catchError(this.handleError)
      )
  }
  getAvailablePlan(): Observable<JSON> {
    return this.http
      .get<JSON>(this.base_path + `/myplan/get_plans`)
      .pipe(
        catchError(this.handleError)
      )
  }
  getPaymentId(data): Observable<JSON> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http
      .post<JSON>(this.base_path + '/payment/create_order', JSON.stringify(data), { headers: headers })
      .pipe(
        catchError(this.handleError)
      )
  }
}
