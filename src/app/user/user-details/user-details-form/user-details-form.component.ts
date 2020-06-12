import { Component, OnInit, ViewChild } from '@angular/core';
import { UserDetailsService } from 'src/app/services/userDetails.service';
import { NgForm } from '@angular/forms';
import { UserDetails } from 'src/app/user/userDetails.model';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user-details-form',
  templateUrl: './user-details-form.component.html',
  styleUrls: ['./user-details-form.component.css'],
})
export class UserDetailsFormComponent implements OnInit {
  @ViewChild('userForm', { static: true }) userForm: NgForm;
  userId: any;
  token: any;
  addressId: any;
  details: UserDetails;
  isReady= false;
  constructor(
    private userDetailsService: UserDetailsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const userStored = JSON.parse(localStorage.getItem('userData'));
    this.userId = userStored.id;
    this.token = userStored._token;

    this.route.params.subscribe((params: Params) => {
      this.addressId = params['id'];
    });
    if (this.addressId) {
      this.onGetDetails();
      this.userDetailsService.loadedDetailsChanged.subscribe((response) => {
        this.details = this.userDetailsService.getUserDetail(
          response,
          this.addressId
        );
        this.isReady = true; 
      });
    }else{
      this.isReady = true; 
    }
  }

  onSubmit() {
    if (!this.addressId) {
      const userDetails = this.userForm.value;
      this.userDetailsService.submitUserDetails(
        userDetails,
        this.userId.id,
        this.userId._token
      );
    } else {
      this.onPatchDetails();
    }
  }

  onGetDetails() {
    this.userDetailsService.getUserDetails(this.userId, this.token).subscribe(
      (responseData) => {
        // this.details = responseData;
        console.log(responseData);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onPatchDetails() {
    this.userDetailsService
      .patchDetails(this.userId, this.addressId, this.details, this.token)
      .subscribe(
        (data) => {
          console.log('Put was successful', data);
        },
        (error) => {
          console.log('Error', error);
        }
      );
  }
}
