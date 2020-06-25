import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule, Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AppComponent } from './app.component';
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
import { StringShortener } from './shorten.pipe';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthComponent } from './auth/auth.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { EditUserAuthComponent } from './user/edit-user-auth/edit-user-auth.component';
import { UserMenuComponent } from './user/user-menu/user-menu.component';
import { EditPasswordAuthComponent } from './user/edit-password-auth/edit-password-auth.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { UserDetailsFormComponent } from './user/user-details/user-details-form/user-details-form.component';
import { UserWishlistComponent } from './user/user-wishlist/user-wishlist.component';
import { AddressModalComponent } from 'src/shared/addressModal/addressModal.component';
import { UserOrdersComponent } from './user/user-orders/user-orders.component';
import { MessageModalComponent } from 'src/shared/messageModal/messageModal.component';

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
    component: BookDetailComponent,
  },
  {
    path: 'edit/:id',
    component: BookEditComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'usermenu',
        pathMatch: 'full',
      },
      {
        path: 'usermenu',
        component: UserMenuComponent,
      },
      {
        path: 'editAuthDetails',
        component: EditUserAuthComponent,
      },

      {
        path: 'editPassword',
        component: EditPasswordAuthComponent,
      },
      {
        path: 'userDetails',
        component: UserDetailsComponent
      }, 
      {
        path: 'userDetailsForm', 
        component: UserDetailsFormComponent
      }, 
      {
        path: 'userDetailsForm/:id', 
        component: UserDetailsFormComponent
      },
      {
        path: 'wishlist', 
        component: UserWishlistComponent
      }, 
      {
        path: 'userOrders', 
        component: UserOrdersComponent
      }
    ],
  },
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
    FooterComponent,
    AuthComponent,
    UserComponent,
    EditUserAuthComponent,
    UserMenuComponent,
    EditPasswordAuthComponent,
    UserDetailsComponent,
    UserDetailsFormComponent,
    UserWishlistComponent,
    AddressModalComponent,
    UserOrdersComponent,
    MessageModalComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'enabled' }),
    NgbModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [StringShortener],
})
export class AppModule {}
