import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
  ValidatorFn
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  standalone: true,
  selector: 'app-profile-page',
  imports: [ReactiveFormsModule, NzButtonModule, NzCheckboxModule, NzFormModule, NzInputModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {

  formLabelSm: number = 10;
  formLabelXs: number = 24;
  formControlSm: number = 14;
  registerOffset: number = 0
  private destroy$ = new Subject<void>();

  private fb = inject(NonNullableFormBuilder);
  validateForm = this.fb.group({
    email: this.fb.control('', [Validators.email, ]),
    password: this.fb.control('', []),
    checkPassword: this.fb.control('', [this.passwordMatchValidator(), Validators.required]),
    firstname: this.fb.control('', []),
    lastname: this.fb.control('', []),
    agree: this.fb.control(false)
  });

  public screenWidth: any;
  public screenHeight: any;

  constructor() {
  }


  ngOnInit(): void {
    this.screenWidth = window.innerWidth -1;
    this.screenHeight = window.innerHeight;
    this.registerOffset = this.screenWidth >= 576 ? this.formLabelSm : 0;

    this.validateForm.controls['checkPassword'].disable();

    this.validateForm.controls['password'].valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      const passHasValue = this.validateForm.controls['password'].value

      if (passHasValue) {
        this.validateForm.controls['checkPassword'].enable();
        this.validateForm.controls['checkPassword'].updateValueAndValidity();
      } else {
        this.validateForm.controls['checkPassword'].disable();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log(this.validateForm.value)

    } else {
      Object.values(this.validateForm.controls).forEach(control => {
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
      } else if (control.value !== this.validateForm.controls['password'].value) {
        return { confirm: true, error: true };
      }
      return {};
    }
  }
}
