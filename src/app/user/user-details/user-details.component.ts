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
  details = [];
  detail: UserDetails;
  noDetails: boolean;
  isLoading;
  private sub: any;

  constructor(private userDetailsService: UserDetailsService) {}

  ngOnInit(): void {
    this.noDetails = true;

    this.userId = JSON.parse(localStorage.getItem('userData'));
    this.onGetDetails();
    this.sub = this.userDetailsService.loadedDetailsChanged.subscribe(
      (updatedDetails: UserDetails[]) => {
        this.details = updatedDetails;
        if (this.details.length > 0) {
          this.noDetails = false;
          this.isLoading = false; 
        }
        this.orderDetails();
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  onGetDetails() {
    this.isLoading = true;
    this.userDetailsService.getUserDetails().subscribe((responseData) => {});
  }

  onDeleteDetail(detailId) {
    const detail = this.details.findIndex((item) => item.id === detailId);
    this.details.splice(detail, 1);

    this.userDetailsService.deleteDetail(detailId);
  }

  orderDetails() {
    this.details.sort((a, b) => {
      return b.primary - a.primary || b.surname - a.surname || b.name - a.name;
    });
    this.isLoading = false;
  }
}
