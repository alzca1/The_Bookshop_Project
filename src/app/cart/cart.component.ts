import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Book } from 'src/app/book.interface';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faFrown } from '@fortawesome/free-regular-svg-icons';
import { UserDetailsService } from 'src/app/services/userDetails.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  faCoffee = faCoffee;
  faFrown = faFrown;
  isLoading: boolean;
  updatedServerCart = [];
  noCart: boolean;
  noDetails: boolean;
  cartReady: boolean;
  total: number;
  amount = [0, 1, 2, 3, 4, 5];
  loadedDetails = [];
  public primaryAddress;
  modal = false;
  orderProcessed = false;
  dateNow = new Date(); 
  dateNowIso = this.dateNow.toISOString();

  updatedCart: {
    id: string;
    title: string;
    author: string;
    cover: string;
    cartAmount: number;
    price: number;
  }[];

  constructor(
    private cartservice: CartService,
    private userDetailsService: UserDetailsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.cartReady = false;
    this.noDetails = true;
    this.noCart = true;
    this.onFetchFromServer();
    this.cartservice.loadedServerCartChanged.subscribe((response) => {
      this.updatedServerCart = response;
      console.log(this.updatedServerCart.length);
      if (this.updatedServerCart.length > 0) {
        this.noCart = false;
      }
      this.onGetTotal();
    });

    this.onGetUserDetails();

    this.userDetailsService.loadedDetailsChanged.subscribe((response) => {
      this.loadedDetails = response;
      if (this.loadedDetails.length > 0) {
        this.noDetails = false;
      }
      if (this.loadedDetails) {
        this.primaryAddress = {
          ...this.loadedDetails.filter((element) => element.primary == true)[0],
        };
      }
      if (!this.noCart && !this.noDetails) {
        this.cartReady = true;
        this.isLoading = false;
      } else {
        this.cartReady = false;
        this.isLoading = false;
      }
    });
  }

  onFetchFromServer() {
    this.cartservice.fetchFromServer().subscribe((response) => {
      this.isLoading = false;
      console.log(response);
    });
  }

  onGetUserDetails() {
    this.userDetailsService.getUserDetails().subscribe((response) => {});
  }

  onGetTotal() {
    console.log('onGetTotal', this.updatedServerCart);
    this.total = Number(this.cartservice.getTotal(this.updatedServerCart));
  }

  onChange(value, cartId) {
    if (value != 0) {
      this.cartservice.updateInServer(cartId, value);
      this.onGetTotal();
    } else {
      let index = this.updatedServerCart.findIndex(
        (element) => element.cartId === cartId
      );
      this.updatedServerCart.splice(0, 1);
      this.onGetTotal();
      this.cartservice.removeFromServer(cartId);
    }
    if (this.updatedServerCart.length === 0) {
      this.noCart = true;
    }
  }

  onChangeAddress() {
    console.log('hello');
    this.modal = true;
  }

  onHandleClose() {
    this.modal = null;
  }

  onHandleCloseProcessed() {
    this.orderProcessed = null;
    setTimeout(() => {
      this.router.navigate(['../books']);
    }, 1000);
  }

  public setAddress(addressId) {
    this.primaryAddress = {
      ...this.loadedDetails.filter((element) => element.id == addressId)[0],
    };
  }

  onProcessOrder() {
    const order = {
      books: this.updatedServerCart,
      address: this.primaryAddress,
      orderDate: this.dateNowIso,
      status: 'pending',
      orderTotal: this.total
    };
    
    setTimeout(() => {
      this.cartservice.processOrder(order);
      this.orderProcessed = true;
      this.cartservice.emptyCart();
    }, 600);
  }
}
