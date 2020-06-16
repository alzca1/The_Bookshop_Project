import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EventEmitter, Injectable } from '@angular/core';
import { Book } from '../book.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ServerService {
  loadedBooksChanged = new EventEmitter<Book[]>();
  loadedBooks: Book[] = [];
  user = JSON.parse(localStorage.getItem('userData'));


  constructor(private http: HttpClient, private router: Router) {}

  submitBook(book: Book) {
    this.http
      .post('https://proyectoangular-5f739.firebaseio.com/books.json', book)
      .subscribe((responseData) => {
        console.log(responseData);
      });
    setTimeout(() => {
      this.router.navigate(['/books']);
    }, 2000);
  }

  fetchBooks() {
    this.loadedBooks = [];
    return this.http
      .get('https://proyectoangular-5f739.firebaseio.com/books.json')
      .pipe(
        map((responseData) => {
          for (let key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              this.loadedBooks.push({ ...responseData[key], id: key });
              this.loadedBooksChanged.emit(this.loadedBooks.slice());
            }
          }
        })
      );
  }

  fetchBook(id) {
    this.fetchBooks().subscribe((posts) => {
      for (let book in this.loadedBooks) {
        if (book[id] === id) {
          console.log(book);
          return book;
        }
      }
    });
  }

  patchBook(id: string, book: Book) {
    const baseUrl =
      'https://proyectoangular-5f739.firebaseio.com/books/' + id + '.json';

    return this.http.patch(baseUrl, {
      author: book.author,
      cover: book.cover,
      id: book.id,
      price: book.price,
      title: book.title,
      summary: book.summary
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

  deleteBook(id: string) {
    const baseUrl =
      'https://proyectoangular-5f739.firebaseio.com/books/' + id + '.json';
    return this.http.delete(baseUrl);
  }
}
