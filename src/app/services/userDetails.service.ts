import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {UserDetails} from '../user/userDetails.model'

@Injectable({ providedIn: 'root' })
export class UserDetailsService {
  constructor(private http: HttpClient) {}
    
  submitUserDetails(details: UserDetails, userId, token) {
    this.http
      .post(
        'https://proyectoangular-5f739.firebaseio.com/users/' + userId +'/details.json?auth=' +token,
        details
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  getUserDetails(userId, token){
    this.http.get('https://proyectoangular-5f739.firebaseio.com/users/' + userId + '/details.json?auth=' +token).subscribe(responseData => {
      console.log(responseData);
    })
  }
}
