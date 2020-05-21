import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Book } from 'src/app/book.interface';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styles: [],
})
export class BookDetailComponent implements OnInit {
  book: { id: string };
  loadedBook: Book;

  constructor(
    private route: ActivatedRoute,
    private srvservice: ServerService
  ) {}

  ngOnInit(): void {
    this.book = {
      id: this.route.snapshot.params['id'],
    };
    this.route.params.subscribe((params: Params) => {
      this.book.id = params['id'];
    });

    this.onFetchPosts();
    this.srvservice.loadedBooksChanged.subscribe((updatedBooks) => {
      for (let key in updatedBooks) {
        if (updatedBooks[key].id === this.book.id) {
          this.loadedBook = { ...updatedBooks[key] };
        }
      }
    });
  }

  onFetchPosts() {
    this.srvservice.fetchPosts().subscribe(() => {
      console.log('books fetched');
    });
  }
}
