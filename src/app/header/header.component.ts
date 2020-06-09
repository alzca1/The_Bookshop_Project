import { Component, OnInit, OnDestroy } from '@angular/core';
import { faHamburger } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  faHamburger = faHamburger;
  faSearch = faSearch;
  faUser = faUser;
  faShoppingCart = faShoppingCart;
  public isMenuCollapsed = true;
  public isNavbarCollapsed = true;
  isAuthenticated = false; 
  userSub: Subscription;
  constructor(private authService : AuthService) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user? false: true;
      console.log(this.isAuthenticated)
    })
  }

  ngOnDestroy(){
    this.userSub.unsubscribe(); 
  }

  toggle() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  
}
