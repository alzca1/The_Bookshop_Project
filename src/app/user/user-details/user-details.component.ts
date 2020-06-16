import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserDetailsService } from 'src/app/services/userDetails.service';
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
  isLoading;
  private sub: any;

  constructor(private userDetailsService: UserDetailsService) {}

  ngOnInit(): void {
    this.isLoading = true;
    console.log('is Loading: ' + this.isLoading);

    this.userId = JSON.parse(localStorage.getItem('userData'));
    this.onGetDetails();
    this.sub = this.userDetailsService.loadedDetailsChanged.subscribe(
      (updatedDetails: UserDetails[]) => {
        this.details = updatedDetails;
       
      }
    );
    this.isLoading = false;
    console.log('is Loading: ' + this.isLoading);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  onGetDetails() {
    this.isLoading = true;
    console.log('is Loading: ' + this.isLoading);
    this.userDetailsService
      .getUserDetails(this.userId.id, this.userId._token)
      .subscribe((responseData) => {
        console.log(responseData);
      });
    this.isLoading = false;
    console.log('is Loading: ' + this.isLoading);
  }

  onDeleteDetail(detailId) {
    const detail = this.details.findIndex((item) => item.id === detailId);
    this.details.splice(detail, 1);
    console.log(this.details);
    this.userDetailsService.deleteDetail(
      this.userId.id,
      detailId,
      this.userId._token
    );
  }
}
