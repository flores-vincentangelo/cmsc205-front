import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzUploadComponent, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-marker-details-input-form',
  standalone: true,
imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzButtonModule, NzGridModule, NzUploadComponent, NzIconModule],
  templateUrl: './marker-details-input-form.component.html',
  styleUrl: './marker-details-input-form.component.css'
})
export class MarkerDetailsInputFormComponent {
  private fb = inject(FormBuilder);
  private messageService = inject(NzMessageService)
  private http = inject(HttpClient)


  nzFlexLabel: number | string = '100px';
  nzFlexControl: number | string = 'auto';

  formLabelSm: number = 5;
  formLabelXs: number = 24;
  formControlSm: number = 17;
  registerOffset: number = 0;
  inputForm = this.fb.group({
    image: this.fb.control(''),
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

  previewFile = (file: NzUploadFile): Observable<string> => {
    console.log('Your upload file:', file);
    return this.http
      .post<{ thumbnail: string }>(`https://next.json-generator.com/api/json/get/4ytyBoLK8`, {
        body: file
      })
      .pipe(map(res => res.thumbnail));
  };


}
