import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UserDetailsService } from 'src/app/services/userDetails.service';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { UserDetails } from 'src/app/user/userDetails.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-details-form',
  templateUrl: './user-details-form.component.html',
  styleUrls: ['./user-details-form.component.css'],
})
export class UserDetailsFormComponent implements OnInit {
  userForm: FormGroup;
  userId: any;
  token: any;
  addressId: any;
  details: UserDetails;
  isReady = false;
  sub: Subscription;
  constructor(
    private userDetailsService: UserDetailsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    const userStored = JSON.parse(localStorage.getItem('userData'));
    this.userId = userStored.id;
    this.token = userStored._token;

    this.addressId = this.route.snapshot.params['id'];

    this.route.params.subscribe((params: Params) => {
      this.addressId = params['id'];
    });
    if (this.addressId) {
      this.onGetDetail();

      this.sub = this.userDetailsService.loadedDetailsChanged.subscribe(
        (loadedDetails) => {
          this.details = loadedDetails;

          this.userForm = new FormGroup({
            firstName: new FormControl(this.details.firstName),
            surname: new FormControl(this.details.surname),
            birthDate: new FormControl(this.details.birthDate),
            address1: new FormControl(this.details.address1),
            address2: new FormControl(this.details.address2),
            postCode: new FormControl(this.details.postCode),
            city: new FormControl(this.details.city),
            country: new FormControl(this.details.country),
          });
          this.isReady = true;
        }
      );
    } else {
      this.userForm = new FormGroup({
        firstName: new FormControl(null),
        surname: new FormControl(null),
        birthDate: new FormControl(null),
        address1: new FormControl(null),
        address2: new FormControl(null),
        postCode: new FormControl(null),
        city: new FormControl(null),
        country: new FormControl(null),
      });
      this.isReady = true;
    }
  }

  onSubmit() {
    console.log('submitting');
    const userDetails = this.userForm.value;
    this.userDetailsService.submitUserDetails(
      userDetails,
      this.userId,
      this.token
    );
    setTimeout(() => {
      this.router.navigate(['user/userDetails']).then();
    }, 1000);
  }

  onGetDetail() {
    this.userDetailsService
      .getUserDetail(this.userId, this.addressId, this.token)
      .subscribe(
        (responseData) => {
          console.log(responseData);
        }
      );
  }

  onPatchDetails() {
    console.log('patching');
    this.userDetailsService
      .patchDetails(
        this.userId,
        this.addressId,
        this.userForm.value,
        this.token
      )
      .subscribe((data) => {
        console.log('Put was successful', data);
      });
    setTimeout(() => {
      this.router.navigate(['user/userDetails']).then();
    }, 1000);
  }
}
