import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { TitleComponent } from '../../components/title/title.component';
import { LoginService } from '../../services/login.service';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { JsonPipe } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    RouterLink,
    TitleComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  loginService = inject(LoginService);
  router = inject(Router);
  us = inject(UserService);
  invalidCreds = false;

  constructor() {}

  private fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  validateForm = this.fb.group({
    email: this.fb.control('', [
      Validators.required,
      Validators.email,
      this.invalidCredsValidator(),
    ]),
    password: this.fb.control('', [
      Validators.required,
      this.invalidCredsValidator(),
    ]),
    remember: this.fb.control(true),
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      this.loginService
        .postLogin(
          this.validateForm.controls['email'].value,
          this.validateForm.controls['password'].value,
        )
        .subscribe({
          next: (res) => {
            if (res.status === 200) {
              const userObj: User = {
                email: res.user.Email,
                firstname: res.user.FirstName,
                lastname: res.user.LastName,
                picture: res.user.Picture,
              };
              console.log(userObj);
              this.us.updateUser(userObj);
              this.router.navigate(['']);
              // must return firstname, lastname and session jwt
            }
          },
          error: (err) => {
            if (err.status === 401) {
              this.invalidCreds = true;
              this.validateForm.controls['email'].updateValueAndValidity();
              this.validateForm.controls['password'].updateValueAndValidity();
            }
          },
        });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  invalidCredsValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && this.invalidCreds) {
        return { invalid: true, error: true };
      } else {
        return {};
      }
    };
  }
}
