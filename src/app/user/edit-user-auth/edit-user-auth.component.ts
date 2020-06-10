import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-edit-user-auth',
  templateUrl: './edit-user-auth.component.html',
  styleUrls: ['./edit-user-auth.component.css'],
})
export class EditUserAuthComponent implements OnInit {
  isMailUpdated = false;
  @ViewChild('mailForm', { static: true })form: NgForm;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onUpdateEmail() {
    this.isMailUpdated = true;
    setTimeout( () => {
      const email = this.form.value.email;
      const changeEmail = this.authService.changeEmail(email);
      changeEmail.subscribe((response) => {
      console.log(response);
      this.authService.logout();
      this.isMailUpdated = false;
      });
    }, 3000)

  }
}
