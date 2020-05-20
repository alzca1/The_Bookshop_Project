import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/book.interface';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @Input() book: {author: string, title: string, cover: string, id: string, price: number} ;

  constructor() { }

  ngOnInit(): void {
  }

}
