import { Injectable } from '@angular/core';
import { Book } from 'src/app/book.interface';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ServerService } from 'src/app/services/server.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartChanged = new EventEmitter<Book[]>();
  cart = [];
  loadedServerCartChanged = new EventEmitter<Book[]>();
  loadedServerCart = [];
  index;

  book: Book;
  user = JSON.parse(localStorage.getItem('userData'));

  constructor(
    private router: Router,
    private http: HttpClient,
    private serverService: ServerService
  ) {}

  getTotal(cart) {
    let total = 0;
    for (let key in cart) {
      total += cart[key].price * cart[key].cartAmount;
    }
    return total.toFixed(2);
  }

  getCart() {
    return this.cart.slice();
  }

  addToCart(book) {
   

    console.log('addToCart triggered!');
    let cartBook = {
      id: book.id,
      title: book.title,
      author: book.author,
      cover: book.cover,
      cartAmount: 1,
      price: book.price,
    };
    const userId = this.user.id;
    const token = this.user._token;
    const baseUrl =
      'https://proyectoangular-5f739.firebaseio.com/users/' +
      userId +
      '/cart/books.json?auth=' +
      token;

    const promise = this.fetchFromServer().toPromise();
    promise.then((data) => {
      for (let i = 0; i < this.loadedServerCart.length; i++) {
        if (this.loadedServerCart[i].id === cartBook.id) {
          this.index = i;
        } else {
          this.index = null;
        }
      }
      if (this.index == null) {
        this.handlePost(baseUrl, cartBook);
      } else {
        const newAmount = +this.loadedServerCart[this.index].cartAmount + 1;
        const cartId = this.loadedServerCart[this.index].cartId;
        this.updateInServer(cartId, newAmount);
      }
    });
  }

  updateInServer(cartId, amount) {
    const baseUrl =
      'https://proyectoangular-5f739.firebaseio.com/users/' +
      this.user.id +
      '/cart/books/' +
      cartId +
      '.json?auth=' +
      this.user._token;
    return this.http
      .patch(baseUrl, {
        cartAmount: amount,
      })
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  fetchFromServer() {
    this.loadedServerCart = [];
    const baseUrl =
      'https://proyectoangular-5f739.firebaseio.com/users/' +
      this.user.id +
      '/cart/books.json?auth=' +
      this.user._token;
    return this.http.get(baseUrl).pipe(
      map((responseData) => {
        for (let key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            this.loadedServerCart.push({ ...responseData[key], cartId: key });
            this.loadedServerCartChanged.emit(this.loadedServerCart.slice());
          }
        }
      })
    );
  }

  removeFromServer(cartId) {
    const baseUrl =
      'https://proyectoangular-5f739.firebaseio.com/users/' +
      this.user.id +
      '/cart/books/' +
      cartId +
      '.json?auth=' +
      this.user._token;
    this.http.delete(baseUrl, cartId).subscribe((response) => {
      console.log('element deleted from cart');
    });
  }

  handlePost(baseUrl, book) {
    this.http.post(baseUrl, book).subscribe((response) => {
      console.log(response);
    });
  }

  handlePatch(baseUrl, object) {
    this.http.patch(baseUrl, object).subscribe((response) => {
      console.log(response);
    });
  }

  processOrder(order) {
    const baseUrl =
      'https://proyectoangular-5f739.firebaseio.com/users/' +
      this.user.id +
      '/orders.json?auth=' +
      this.user._token;
      this.http.post(baseUrl, order).subscribe(response => {
        console.log(response);
      })
    this.updateStock(order);
  }

  emptyCart() {
    const baseUrl =
      'https://proyectoangular-5f739.firebaseio.com/users/' +
      this.user.id +
      '/cart.json?auth=' +
      this.user._token;
    this.http.delete(baseUrl).subscribe((response) => {
      console.log(response);
    });
  }

  updateStock(order) {
    const orderBooks = order.books;
    const bookCollection = this.serverService.loadedBooks;

    orderBooks.map((book) => {
      const bookOrderAmount = book.cartAmount
      this.serverService.checkStockAvailability(book.id).subscribe(response => {
        const fetchedBook:any = response;
        console.log(fetchedBook.id)
        const remainingStock = fetchedBook.stock - bookOrderAmount;
     if(remainingStock>=0){
     this.serverService.patch(book.id,{
       stock: remainingStock
     }).subscribe(response => {
       console.log(response)
     })
     }
      })
    });
  }
}
