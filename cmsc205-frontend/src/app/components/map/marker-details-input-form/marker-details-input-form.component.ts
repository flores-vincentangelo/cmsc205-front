import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';



@Component({
  selector: 'app-marker-details-input-form',
  standalone: true,
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzButtonModule],
  templateUrl: './marker-details-input-form.component.html',
  styleUrl: './marker-details-input-form.component.css'
})
export class MarkerDetailsInputFormComponent {
  private fb = inject(FormBuilder);


  formLabelSm: number = 10;
  formLabelXs: number = 24;
  formControlSm: number = 14;
  registerOffset: number = 0;
  inputForm = this.fb.group({
    descrption: this.fb.control('')
  })

  submitForm(): void {
    // if (this.validateForm.valid) {
    //   console.log(this.validateForm.value);
    //   this.validateForm.reset();
    // } else {
    //   Object.values(this.validateForm.controls).forEach((control) => {
    //     if (control.invalid) {
    //       control.markAsDirty();
    //       control.updateValueAndValidity({ onlySelf: true });
    //     }
    //   });
    // }
  }

}
