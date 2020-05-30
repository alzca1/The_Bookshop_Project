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
  animations: [
    trigger('collapseNav', [
      state(
        'closed',
        style({
          height: '0px',
          opacity: 0,
        })
      ),
      state(
        'open',
        style({
          height: '400px',
          opacity: 1,
        })
      ),

      transition('closed => open', animate('500ms ease-in-out')),
      transition('open => closed', animate('500ms ease-in')),
    ]),
    trigger('collapseMenu', [
      state(
        'initial',
        style({
          height: '0',
          overflow: 'hidden',
          opacity: '1',
        })
      ),
      state(
        'final',
        style({
          height: '100px',
          overflow: 'hidden',
          opacity: '1',
        })
      ),
      transition('initial => final', animate('300ms ease-out')),
      transition('final => initial', animate('450ms ease-in')),
    ]),
  ],
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
