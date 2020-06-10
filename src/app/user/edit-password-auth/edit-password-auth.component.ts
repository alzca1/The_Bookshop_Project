import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-password-auth',
  templateUrl: './edit-password-auth.component.html',
  styleUrls: ['./edit-password-auth.component.css'],
})
export class EditPasswordAuthComponent implements OnInit {
  @ViewChild('passwordForm', { static: true }) form: NgForm;
  isPasswordUpdated = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onUpdatePassword() {
    setTimeout(() => {
      this.isPasswordUpdated = true; 
      const password = this.form.value.password;
      console.log(password)
      const changePassword = this.authService.changePassword(password);
      changePassword.subscribe((response) => {
        console.log(response);
        this.authService.logout();
        this.isPasswordUpdated = false;
      });
    }, 3000);
  }
}
