import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styles: [],
})
export class BookDetailComponent implements OnInit {
  book: { id: string };
  loadedBook = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.book = {
      id: this.route.snapshot.params['id'],
    };
    this.route.params.subscribe((params: Params) => {
      this.book.id = params['id'];
    });
    this.getBook(this.book.id);

  }

  getBook(id){
    this.http.get('https://proyectoangular-5f739.firebaseio.com/books.json').pipe(map(responseData => {
      for (let key in responseData){
       if(key === id){
         this.loadedBook.push(responseData[id]);
       }
      }
    })).subscribe(posts => {
      console.log('hello')
    })
  }

  // fetchPosts(){
  //   this.http.get('https://proyectoangular-5f739.firebaseio.com/books.json').pipe(map(responseData => {
  //     for(let key in responseData){
  //       if(responseData.hasOwnProperty(key)){
  //         this.loadedBooks.push({...responseData[key], id:key})
  //       }
  //     }
  //   })).subscribe(posts => {
  //     console.log(posts);
  //     console.log(this.loadedBooks)
  //   })
  // }
}
