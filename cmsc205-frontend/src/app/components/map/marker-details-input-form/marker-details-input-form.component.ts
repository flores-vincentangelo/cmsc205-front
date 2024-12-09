import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzUploadComponent, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-marker-details-input-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzGridModule,
    NzUploadComponent,
    NzIconModule,
    NzSelectModule,
  ],
  templateUrl: './marker-details-input-form.component.html',
  styleUrl: './marker-details-input-form.component.css',
})
export class MarkerDetailsInputFormComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  nzFlexLabel: number | string = '100px';
  nzFlexControl: number | string = 'auto';

  formLabelSm: number = 5;
  formLabelXs: number = 24;
  formControlSm: number = 17;
  registerOffset: number = 0;
  inputForm = this.fb.group({
    image: this.fb.control(''),
    state: this.fb.control('', [Validators.required]),
    descrption: this.fb.control('', [Validators.required]),
  });

  submitForm(): void {
    if (this.inputForm.valid) {
      console.log(this.inputForm.value);
      this.inputForm.reset();
    } else {
      Object.values(this.inputForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  previewFile = (file: NzUploadFile): Observable<string> => {
    console.log('Your upload file:', file);
    return this.http
      .post<{ thumbnail: string }>(
        `https://next.json-generator.com/api/json/get/4ytyBoLK8`,
        {
          body: file,
        },
      )
      .pipe(map((res) => res.thumbnail));
  };
}
