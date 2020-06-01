import { Component, OnInit } from '@angular/core';
import { faHamburger } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import {
  transition,
  state,
  style,
  animate,
  trigger,
} from '@angular/animations';
import { bindCallback } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  faHamburger = faHamburger;
  faSearch = faSearch;
  faUser = faUser;
  faShoppingCart = faShoppingCart;
  public isMenuCollapsed = true;
  public isNavbarCollapsed = true;
  constructor() {}

  ngOnInit(): void {}

  toggle() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
}
