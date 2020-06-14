import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { UserDetailsService } from 'src/app/services/userDetails.service';
import { NgForm } from '@angular/forms';
import { UserDetails } from 'src/app/user/userDetails.model';
import { ActivatedRoute } from '@angular/router';

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
    console.log('ngOnInit called!');

    this.userId = JSON.parse(localStorage.getItem('userData'));
    this.onGetDetails();
    this.sub = this.userDetailsService.loadedDetailsChanged.subscribe(
      (updatedDetails: UserDetails[]) => {
        this.details = updatedDetails;
        console.log('hello from subscribe')
      }
      );
      this.isLoading = false;
      
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  onGetDetails() {
    this.isLoading = true;
    this.userDetailsService
      .getUserDetails(this.userId.id, this.userId._token)
      .subscribe((responseData) => {
        console.log(responseData);
      });
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
