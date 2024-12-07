import {
  Component,
  OnDestroy,
  OnInit,
  inject,
  HostListener,
} from '@angular/core';
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
import { NzSelectModule } from 'ng-zorro-antd/select';

import { TitleComponent } from '../../components/title/title.component';

import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    TitleComponent,
  ],
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  router = inject(Router);

  formLabelSm: number = 10;
  formLabelXs: number = 24;
  formControlSm: number = 14;
  registerOffset: number = 0;
  private destroy$ = new Subject<void>();
  private registerService = inject(RegisterService);

  private fb = inject(NonNullableFormBuilder);
  validateForm = this.fb.group({
    email: this.fb.control('', [Validators.email, Validators.required]),
    password: this.fb.control('', [Validators.required]),
    checkPassword: this.fb.control('', [
      Validators.required,
      this.passwordMatchValidator(),
    ]),
    firstname: this.fb.control('', [Validators.required]),
    lastname: this.fb.control('', [Validators.required]),
    agree: this.fb.control(false),
  });

  public screenWidth: any;
  public screenHeight: any;

  constructor() {}

  ngOnInit(): void {
    this.screenWidth = window.innerWidth - 1;
    this.screenHeight = window.innerHeight;
    this.registerOffset = this.screenWidth >= 576 ? this.formLabelSm : 0;

    this.validateForm.controls['password'].valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.validateForm.controls['checkPassword'].updateValueAndValidity();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const res = this.registerService.register(this.validateForm.value);
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
}
