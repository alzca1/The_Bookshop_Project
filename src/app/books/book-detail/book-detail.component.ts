import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Book } from 'src/app/book.interface';
import { ServerService } from 'src/app/services/server.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class BookDetailComponent implements OnInit {
  id: string;
  loadedBook: Book;
  loadingBook: boolean;

  constructor(
    private route: ActivatedRoute,
    private srvservice: ServerService,
    private router: Router,
    private cartservice: CartService
  ) {}

  ngOnInit(): void {
    (this.id = this.route.snapshot.params['id']),
      this.route.params.subscribe((params: Params) => {
        this.id = params['id'];
      });

    this.onFetchPosts();
    this.srvservice.loadedBooksChanged.subscribe((updatedBooks) => {
      for (let key in updatedBooks) {
        if (updatedBooks[key].id === this.id) {
          this.loadedBook = { ...updatedBooks[key] };
        }
      }
    });
  }

  onFetchPosts() {
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

  onAddToCart(){

    this.cartservice.addToCart(this.loadedBook);
    console.log(this.loadedBook)
  }
}
