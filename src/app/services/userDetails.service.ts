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
      .subscribe((responseData) => {});
  }

  getUserDetails(userId, token) {
    this.loadedDetails = [];
    return this.http
      .get(
        'https://proyectoangular-5f739.firebaseio.com/users/' +
          userId +
          '/details.json?auth=' +
          token
      )
      .pipe(
        map((responseData) => {
          for (let key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              this.loadedDetails.push({ ...responseData[key], id: key });
              this.loadedDetailsChanged.emit(this.loadedDetails);
            }
          }
        })
      );
  }

  getUserDetail(userId, addressId, token){
    
    const baseUrl = 'https://proyectoangular-5f739.firebaseio.com/users/' + userId + '/details/' + addressId + '.json?auth=' + token
    return this.http.get(baseUrl).pipe(map(responseData => {
        console.log(responseData)
          this.loadedDetailsChanged.emit(responseData)
        }
    ))}
      
    
  


  // getUserDetail(data, id) {
  //   const item = data.find(item => item.id === id);
  //   console.log(item);
  //   return item; 
  //   // console.log(data)
  //   // console.log(id)
  //   // let detail;
  //   // data.forEach((element) => {
  //   //   console.log(element)
  //   //   if (element.id === id) {
  //   //     detail = element;
  //   //   }
  //   // });
  //   // for (let detail of data) {
  //   //   console.log(detail);
  //   //   if (detail.id === id) {
  //   //     console.log(detail);
  //   //     return detail;
  //   //   }
  //   // }
    
  // }

  patchDetails(userId, detailsId, data, token) {
    const baseUrl =
      'https://proyectoangular-5f739.firebaseio.com/users/' +
      userId +
      '/details/' +
      detailsId +
      '.json?auth=' +
      token;
      console.log(baseUrl)
      console.log(data);
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
    });
  }
}
