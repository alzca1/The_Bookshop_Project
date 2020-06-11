import { Component, OnInit, ViewChild } from '@angular/core';
import { UserDetailsService } from 'src/app/services/userDetails.service';
import { NgForm } from '@angular/forms';
import { UserDetails } from 'src/app/user/userDetails.model';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
@ViewChild('userForm', {static: true}) userForm: NgForm
userId: any; 
  constructor(private userDetailsService : UserDetailsService) { }

  ngOnInit(): void {
     this.userId = JSON.parse(localStorage.getItem('userData'));
  }

  onSubmit(){
    const userDetails = this.userForm.value;
    
    // console.log(this.userId._token)
    const details = this.onGetDetails(); 
    console.log(details);
    // this.userDetailsService.submitUserDetails(userDetails, this.userId.id, this.userId._token)
  }

  onGetDetails(){
    this.userDetailsService.getUserDetails(this.userId.id, this.userId._token)
  }
}














