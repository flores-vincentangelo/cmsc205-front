import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzImageModule } from 'ng-zorro-antd/image';

import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  standalone: true,
  selector: 'app-profile-page',
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
    NzInputModule,
    NzTypographyModule,
    NzImageModule,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent {
  router = inject(Router);
  us = inject(UserService);
  ls = inject(LoginService);
  user!: User;
  fullname: string = '';
  // firstname: string = '';
  // lastname: string = '';

  nzFlexLabel: number | string = '150px';
  nzFlexControl: number | string = 'auto';

  formControlSm: number = 25;
  formControlMd: number = 24;
  private destroy$ = new Subject<void>();

  private fb = inject(NonNullableFormBuilder);
  validateForm = this.fb.group({
    email: this.fb.control('', [Validators.email]),
    password: this.fb.control('', []),
    checkPassword: this.fb.control('', [
      this.passwordMatchValidator(),
      Validators.required,
    ]),
    firstname: this.fb.control('', []),
    lastname: this.fb.control('', []),
  });

  public screenWidth: any;
  public screenHeight: any;

  constructor() {}

  ngOnInit(): void {
    this.screenWidth = window.innerWidth - 1;
    this.screenHeight = window.innerHeight;

    this.user = this.us.getUser();
    this.fullname = `${this.user.firstname} ${this.user.lastname}`;

    this.validateForm.controls['checkPassword'].disable();

    this.validateForm.controls['password'].valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const passHasValue = this.validateForm.controls['password'].value;

        if (passHasValue) {
          this.validateForm.controls['checkPassword'].enable();
          this.validateForm.controls['checkPassword'].updateValueAndValidity();
        } else {
          this.validateForm.controls['checkPassword'].disable();
        }
      });

    this.validateForm.controls['firstname'].setValue(this.user.firstname);
    this.validateForm.controls['lastname'].setValue(this.user.lastname);
    this.validateForm.controls['email'].setValue(this.user.email);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log(this.validateForm.value);
      this.validateForm.reset();
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return { required: true };
      } else if (
        control.value !== this.validateForm.controls['password'].value
      ) {
        return { confirm: true, error: true };
      }
      return {};
    };
  }

  signOut(): void {
    this.ls.setLoggedInStatus(false);
    this.router.navigate(['login']);
  }
}
