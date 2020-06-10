import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  userName: string;
  constructor(private authService: AuthService, private router: Router) {}

  onLogout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      if (user) {
        this.userName = user.email;
      }
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  
}
