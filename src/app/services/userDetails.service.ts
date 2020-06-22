import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDetails } from '../user/userDetails.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserDetailsService {
  loadedDetailsChanged = new EventEmitter<any>();
  loadedDetails: UserDetails[] = [];
  constructor(private http: HttpClient) {}
  user = JSON.parse(localStorage.getItem('userData'));

  submitUserDetails(details: UserDetails) {
    this.http
      .post(
        'https://proyectoangular-5f739.firebaseio.com/users/' +
          this.user.id +
          '/details.json?auth=' +
          this.user._token,
        details
      )
      .subscribe((responseData) => {});
  }

  getUserDetails() {
    this.loadedDetails = [];
    return this.http
      .get(
        'https://proyectoangular-5f739.firebaseio.com/users/' +
          this.user.id +
          '/details.json?auth=' +
          this.user._token
      )
      .pipe(
        map((responseData) => {
          for (let key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              this.loadedDetails.push({ ...responseData[key], id: key });
              this.loadedDetailsChanged.emit(this.loadedDetails);
            }
          }
          console.log(this.loadedDetails);
        })
      );
  }

  getUserDetail(addressId) {
    const baseUrl =
      'https://proyectoangular-5f739.firebaseio.com/users/' +
      this.user.id +
      '/details/' +
      addressId +
      '.json?auth=' +
      this.user._token;
    return this.http.get(baseUrl).pipe(
      map((responseData) => {
        this.loadedDetailsChanged.emit(responseData);
      })
    );
  }

  patchDetails(addressId, data) {
    const baseUrl =
      'https://proyectoangular-5f739.firebaseio.com/users/' +
      this.user.id +
      '/details/' +
      addressId +
      '.json?auth=' +
      this.user._token;

    return this.http.patch(baseUrl, {
      firstName: data.firstName,
      surname: data.surname,
      id: data.id,
      birthDate: data.birthDate,
      address1: data.address1,
      address2: data.address2,
      postCode: data.postCode,
      city: data.city,
      country: data.country,
      primary: data.primary,
    });
  }

  deleteDetail(detailsId) {
    const baseUrl =
      'https://proyectoangular-5f739.firebaseio.com/users/' +
      this.user.id +
      '/details/' +
      detailsId +
      '.json?auth=' +
      this.user._token;
    this.http.delete(baseUrl).subscribe((response) => {
      this.getUserDetails().subscribe((response) => {});
    });
  }

  primaryHandler() {
    const item = this.loadedDetails.filter((item) => item.primary == true)[0];
    if (item) {
      this.patchDetails(item.id, {
        primary: false,
      }).subscribe((response) => {
        console.log(response);
      });
    }else{
      return; 
    }
  }
}
