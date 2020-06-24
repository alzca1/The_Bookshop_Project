import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerService } from '../services/server.service';
import { Book } from 'src/app/book.interface';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  //TODO add "loading books state"
  isLoading: boolean;
  loadedBooks: Book[];
  constructor(private http: HttpClient, private srvservice: ServerService) {}

  ngOnInit(): void {
    this.loadedBooks = [];
    this.fetchPosts();
    this.srvservice.loadedBooksChanged.subscribe((updatedBooks: Book[]) => {
      this.loadedBooks = updatedBooks;
    });
  }

  fetchPosts() {
    this.isLoading = true;
    this.loadedBooks = [];
    this.srvservice.fetchBooks().subscribe((books) => {
      console.log('books fetched')
      this.isLoading = false;
    });
  }

  deletePosts() {
    let question = prompt('are you sure you want to destroy all books?');
    if (question) {
      this.http
        .delete('https://proyectoangular-5f739.firebaseio.com/books.json')
        .subscribe((response) => {
          console.log(response);
        });
      this.loadedBooks = [];
    }
  }

}
