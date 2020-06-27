import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  user = JSON.parse(localStorage.getItem('userData'));
  loadedOrders = [];
    loaderOrdersChanged = new EventEmitter<any>();
  constructor(private http: HttpClient) {}

  getOrders() {
    this.loadedOrders = []; 
    const baseUrl =
      'https://proyectoangular-5f739.firebaseio.com/users/' +
      this.user.id +
      '/orders.json?auth=' +
      this.user._token;

    return this.http.get(baseUrl).pipe(map(orders => {
        for(let key in orders){
            if(orders.hasOwnProperty(key)){
                this.loadedOrders.push({...orders[key], id:key});
                this.loaderOrdersChanged.emit(this.loadedOrders.slice())
            }
        }
    }))
  }
}
