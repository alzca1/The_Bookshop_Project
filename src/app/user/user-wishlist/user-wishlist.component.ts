import { Component, OnInit } from '@angular/core';
import { Book } from '../../book.interface';
import { WishlistService } from 'src/app/services/wishlist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-wishlist',
  templateUrl: './user-wishlist.component.html',
  styleUrls: ['./user-wishlist.component.css'],
})
export class UserWishlistComponent implements OnInit {
  isLoading: boolean; 
  loadedWishList: Book[] = [];
  book: Book;
  constructor(private wishlistService: WishlistService, private route: Router) {}

  ngOnInit(): void {
    this.loadedWishList = []; 
    this.onGetWishList(); 
    this.wishlistService.loadedWishListChanged.subscribe((responseData) => {
      this.loadedWishList = responseData;
      
    });
  }

  onGetWishList() {
    this.isLoading = true; 
    this.loadedWishList = []; 
    const user = JSON.parse(localStorage.getItem('userData'));
    this.wishlistService.fetchWishList(user.id, user._token).subscribe((response) => {
      console.log("wishlist fetched")
      this.isLoading = false; 
    });
  
  }

  

  
 
  
}
