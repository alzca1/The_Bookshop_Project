import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Book } from 'src/app/book.interface';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
})
export class BookFormComponent implements OnInit {
  @ViewChild('bookForm', { static: true }) bookForm: NgForm;

  constructor(private http: HttpClient, private router: Router, private srvService: ServerService) {}

    onSubmit(){
      this.srvService.submitBook(this.bookForm.value);
    }

  // onSubmit(book: Book) {
  //   this.http
  //     .post('https://proyectoangular-5f739.firebaseio.com/books.json', book)
  //     .subscribe((responseData) => {
  //       console.log(responseData);
  //     });
  //   setTimeout(() => {
  //     this.router.navigate(['/books']);
  //   }, 2000);
  // }

  ngOnInit(): void {}
}



