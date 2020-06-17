import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Book } from 'src/app/book.interface';
import { ServerService } from 'src/app/services/server.service';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BookDetailComponent implements OnInit {
  id: string;
  wishId: string;
  loadedBook: Book;
  loadingBook: boolean;
  onWishList: boolean;
  wishList: Book[];

  constructor(
    private route: ActivatedRoute,
    private srvservice: ServerService,
    private router: Router,
    private cartservice: CartService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    // recibimos el id del libro y su booleano de wishlist si
    // aparecen params y fragment en la ruta que lo trae hasta aquí
    (this.id = this.route.snapshot.params['id']),
      this.route.params.subscribe((params: Params) => {
        this.id = params['id'];
      });
    this.route.fragment.subscribe((fragment) => {
      if (fragment === 'true') {
        this.onWishList = true;
      }
    });

    // compruebo si el libro está en la wishList
    this.checkBookOnWishList();
    // descargo lista de todos los libros
    this.onFetchBooks();
    // me subscribo a la lista de libros descargados
    this.srvservice.loadedBooksChanged.subscribe((updatedBooks) => {
      for (let key in updatedBooks) {
        if (updatedBooks[key].id === this.id) {
          this.loadedBook = { ...updatedBooks[key] };
        }
      }
    });
// me subscribo a la lista de libros de la wishlist descargados
    this.wishlistService.loadedWishListChanged.subscribe((wishlistBooks) => {});

    // fin del init
  }

  onFetchBooks() {
    this.loadingBook = true;
    this.srvservice.fetchBooks().subscribe(() => {
      console.log('books fetched');
      this.loadingBook = false;
    });
  }

  onDeleteBook() {
    const warning = prompt(
      `Are you sure you want to delete you want to delete ${this.loadedBook.title}? If so, please type 'yes'`
    );

    if (warning.toLowerCase() === 'yes') {
      this.srvservice.deleteBook(this.id).subscribe(
        (result) => {
          console.log('book deleted', result);
        },
        (error) => {
          console.log('error!', error);
        }
      );
      setTimeout(() => {
        this.router.navigate(['books/']);
      }, 1000);
    }
  }

  onAddToCart() {
    this.cartservice.addToCart(this.loadedBook);
    console.log(this.loadedBook);
  }

  onHandleBookInWishlist() {
    const user = JSON.parse(localStorage.getItem('userData'));
    console.log(this.loadedBook);
    console.log(user.id);
    if (!this.onWishList) {
      this.wishlistService.addToWishlist(this.loadedBook, user.id, user._token).subscribe((response) => {
        console.log('response from addToWishList')
        this.wishId = response.name
        console.log(response.name);
      });;
      // meter aquí la referencia que nos sirve el subscribe de addToWishList
      // this.checkBookOnWishList();
      this.onWishList = true;
    } else {
      this.wishlistService.removeFromWishlist(
        this.wishId,
        user.id,
        user._token
      );
      this.onWishList = false;
    }
  }

  checkBookOnWishList() {
    // hago un get para conseguir la wishlist
    this.wishlistService.fetchWishList(
      this.wishlistService.user.id,
      this.wishlistService.user._token
    );
    // me subscribo a la variable que recoge la lista de la wishlist
    this.wishlistService.loadedWishListChanged.subscribe((wishList) => {
      const wishBook = wishList.filter((book) => book.id === this.id)
      console.log(wishBook)
      if (wishBook.length > 0) {
        console.log('book already in wishlist');
        this.wishId = wishBook[0].wishId;
        this.onWishList = true;
      }
    });
    console.log('wishlist check finished!');
  }
}
