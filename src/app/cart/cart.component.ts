import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Book } from 'src/app/book.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  updatedCart: {id:string, title: string, author: string, cover: string, cartAmount: number, price: number}[];

  constructor(private cartservice: CartService) { }

  ngOnInit(): void {
    this.updatedCart = this.cartservice.getCart();
    this.cartservice.cartChanged.subscribe((cartChanged) => {
      this.updatedCart = [...cartChanged];
    })
    console.log('initialized')
  }

  logCart(){
    console.log(this.cartservice.cart)
    console.log('hello')
    console.log(this.updatedCart)
    console.log(this.cartservice.cartChanged)
  }
}
