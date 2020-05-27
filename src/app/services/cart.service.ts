import { Injectable } from '@angular/core';
import { Book } from 'src/app/book.interface';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartChanged = new EventEmitter<Book[]>();
  cart= [];
  book:Book;

  constructor(private router: Router) {}

  addToCart(book) {
    let cartBook = {
      id: book.id,
      title: book.title,
      author: book.author,
      cover: book.cover,
      cartAmount: 1,
      price: book.price
    }
    // comprueba duplicidad. Hace un map de todas las id's de los libros
    // y se guarda en existingIds. Si existingIds no contiene el book.id,
    // se hace push del libro. De lo contrario, averiguamos el índice del
    // libro a partir de su id y le añadimos una unidad más.
    const existingIds = this.cart.map(addedBook => addedBook.id);
    if(!existingIds.includes(book.id)){
      this.cart.push({...cartBook});
    }else{
      this.cart[this.cart.findIndex(el => el.id === book.id )].cartAmount +=1;
    }



    this.cartChanged.emit(this.cart.slice());

    setTimeout(() => {
      this.router.navigate(['/cart']);
    }, 300);
  }

  getTotal(cart) {
    let total = 0;
    for (let key in cart) {
      total += (cart[key].price * cart[key].cartAmount);
    }
    return total.toFixed(2)
  }

  getCart(){
    return this.cart.slice();
  }


}


