import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Book } from '../book.interface';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  loadedWishListChanged = new EventEmitter<Book[]>();
  loadedWishList = [];
  user = JSON.parse(localStorage.getItem('userData'));

  constructor(private http: HttpClient) {}

  addToWishlist(bookId, userId, token) {
    this.fetchWishList(userId, token);
    const baseUrl =
      'https://proyectoangular-5f739.firebaseio.com/users/' +
      userId +
      '/wishlist.json?auth=' +
      token;
    if (
      !this.loadedWishList.some((element) => {
        element.id == bookId;
      })
    ) {
      return  this.http.post(baseUrl, bookId)
    } else {
      console.log('book already in wishlist');
    }
  }

  fetchWishList(userId, token) {
    this.loadedWishList = [];
    const baseUrl =
      'https://proyectoangular-5f739.firebaseio.com/users/' +
      userId +
      '/wishlist.json?auth=' +
      token;
    return this.http
      .get(baseUrl)
      .pipe(
        map((responseData) => {
          for (let key in responseData) {
            if (
              !this.loadedWishList.some(
                (book) => book.id === responseData[key].id
              )
            ) {
              this.loadedWishList.push({ ...responseData[key], wishId:key });
              this.loadedWishListChanged.emit(this.loadedWishList.slice());
            }
          }
        })
      )
  }

  removeFromWishlist(wishId,userId,token) {
    console.log(wishId)
    const baseUrl =
      'https://proyectoangular-5f739.firebaseio.com/users/' +
      userId +
      '/wishlist/' + wishId + '.json?auth=' +
      token;
      console.log(wishId)
       this.http.delete(baseUrl).subscribe((response) => {
        console.log(response);
      }, error => {
        console.log(error)
      });
  }
}
