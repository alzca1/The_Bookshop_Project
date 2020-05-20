import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators'

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  loadedBooks = [];

  fetchPosts(){
    this.http.get('https://proyectoangular-5f739.firebaseio.com/books.json').pipe(map(responseData => {
      for(let key in responseData){
        if(responseData.hasOwnProperty(key)){
          this.loadedBooks.push({...responseData[key], id:key})
        }
      }
    })).subscribe(posts => {
      console.log(posts);
      console.log(this.loadedBooks)
    })
  }

  deletePosts(){
    let question = prompt('are you sure you want to destroy all books?');
    if(question){
      this.http.delete('https://proyectoangular-5f739.firebaseio.com/books.json').subscribe(response => {
        console.log(response)
      });
      this.loadedBooks = [];
    }

  }


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchPosts();
  }




}
