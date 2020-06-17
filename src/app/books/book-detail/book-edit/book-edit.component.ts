import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { Book } from 'src/app/book.interface';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css'],
})
export class BookEditComponent implements OnInit {
  book: Book;
  books: Book[];
  id: string;

  constructor(
    private route: ActivatedRoute,
    private srvservice: ServerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.srvservice.loadedBooksChanged.subscribe((loadedBooks) => {
      this.books = loadedBooks;
     
    });
    this.getBook(this.id);
  }

  getBook(id) {
    this.srvservice.fetchBooks().subscribe((books) => {
  
    });
    if (Object.entries(this.srvservice.loadedBooks).length > 0) {
      this.books = this.srvservice.loadedBooks;
    } else {
      this.srvservice.fetchBooks().subscribe((loadedBooks) => {
       
        this.books = this.srvservice.loadedBooks;
        for (let key in this.books) {
          if (this.books[key].id === this.id) {
            this.book = this.books[key];
          }
        }
      });
    }
  }

  onEditBook() {
    this.srvservice.patchBook(this.id, this.book).subscribe(
      (data) => {
        console.log('Put was successful', data);
      },
      (error) => {
        console.log('Error', error);
      }
    );
    setTimeout(() => {
      const baseRoute = 'detail/'+this.id
        this.router.navigate([baseRoute]);
    }, 200);
  }

}
