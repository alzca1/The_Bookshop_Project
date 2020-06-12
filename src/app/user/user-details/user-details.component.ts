import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UserDetailsService } from 'src/app/services/userDetails.service';
import { NgForm } from '@angular/forms';
import { UserDetails } from 'src/app/user/userDetails.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  userId: any;
  details: any;
  detail: UserDetails;
  private sub: any; 

  constructor(private userDetailsService: UserDetailsService) {}

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('userData'));
    this.onGetDetails();
    this.sub = this.userDetailsService.loadedDetailsChanged.subscribe((updatedDetails:UserDetails[]) => {
      this.details = updatedDetails;
      console.log(this.details)
    })
  }

  ngOnDestroy():void{
    this.sub.unsubscribe(); 
  }
  onGetDetails() {
    this.userDetailsService
      .getUserDetails(this.userId.id, this.userId._token)
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }
}
