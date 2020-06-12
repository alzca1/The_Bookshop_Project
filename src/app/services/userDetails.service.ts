import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDetails } from '../user/userDetails.model';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class UserDetailsService {
  loadedDetailsChanged = new EventEmitter<UserDetails[]>(); 
  loadedDetails: UserDetails[] = [];
  constructor(private http: HttpClient) {}

  submitUserDetails(details: UserDetails, userId, token) {
    this.http
      .post(
        'https://proyectoangular-5f739.firebaseio.com/users/' +
          userId +
          '/details.json?auth=' +
          token,
        details
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  getUserDetails(userId, token) {
    this.loadedDetails = []; 
    return this.http.get(
      'https://proyectoangular-5f739.firebaseio.com/users/' +
        userId +
        '/details.json?auth=' +
        token
    ).pipe(map(responseData => {
      for(let key in responseData){
        if(responseData.hasOwnProperty(key)){
          this.loadedDetails.push({...responseData[key], id:key});
          console.log(this.loadedDetails)
          this.loadedDetailsChanged.emit(this.loadedDetails);
        }
      }
    }));

  }

  getUserDetail(data, id){
    for (let detail of data){
      console.log(id)
      console.log(detail.id)
      if(detail.id == id){
        return detail; 
      }
    }
  }

  patchDetails(userId, detailsId, data, token){
    const baseUrl = 'https://proyectoangular-5f739.firebaseio.com/users/' +
    userId +
    '/details/' + detailsId +'.json?auth=' +
    token;
    return this.http.patch(baseUrl, {
     firstName: data.firstName,
     surname: data.surname,
     id: data.id,
     birthDate: data.birthDate,
     address1: data.address1,
     address2: data.address2,
     postCode: data.postCode,
     city: data.city,
     country: data.country
    })
  }
}
