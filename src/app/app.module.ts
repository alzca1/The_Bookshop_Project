import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule, Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Route, RouterModule } from '@angular/router';
import { BookFormComponent } from './book-form/book-form.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { BooksComponent } from './books/books.component';
import { BookComponent } from './books/book/book.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BookEditComponent } from 'src/app/books/book-detail/book-edit/book-edit.component';
import { CartComponent } from './cart/cart.component';
import {StringShortener} from './shorten.pipe';
import { FooterComponent } from './footer/footer.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const appRoutes: Route[] = [
  {
    path: 'bookform',
    component: BookFormComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'books',
    component: BooksComponent,
  },
  {
    path: 'detail/:id',
    component: BookDetailComponent },
    {
      path: 'edit/:id',
      component: BookEditComponent
    },
    {
      path: 'cart',
      component: CartComponent
    }
];

@NgModule({
  declarations: [
    AppComponent,
    BookFormComponent,
    HomeComponent,
    HeaderComponent,
    BooksComponent,
    BookComponent,
    BookDetailComponent,
    BookEditComponent,
    CartComponent,
    StringShortener,
    FooterComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'enabled' }),
    NgbModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [StringShortener]
})
export class AppModule {}
