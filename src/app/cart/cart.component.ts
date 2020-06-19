import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Book } from 'src/app/book.interface';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faFrown } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  faCoffee = faCoffee;
  faFrown = faFrown;
  updatedCart: {
    id: string;
    title: string;
    author: string;
    cover: string;
    cartAmount: number;
    price: number;
  }[];
  updatedServerCart = [];
  total: number;
  startingAmount = 1;
  constructor(private cartservice: CartService) {}

  ngOnInit(): void {
    this.updatedServerCart = [];
    this.cartservice.fetchFromServer();
    this.cartservice.loadedServerCartChanged.subscribe((response) => {
      this.updatedServerCart = response;
      console.log(this.updatedServerCart);
      this.onGetTotal();
    });
  }

  onGetTotal() {
    console.log('onGetTotal', this.updatedServerCart);
    this.total = Number(this.cartservice.getTotal(this.updatedServerCart));
  }

  onChange(value, id) {
    this.cartservice.cart.forEach((element) => {
      if (element.id === id) {
        element.cartAmount = value;
        this.cartservice.updateInServer(value);
        console.log(element);
      }
    });
    this.onGetTotal();
  }
}
