import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzUploadComponent, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';

const getBase64 = (
  file: File | undefined,
): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    } else {
      reject(null);
    }
  });

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
    return of('string');
    // return this.http
    //   .post<{ thumbnail: string }>(
    //     `https://next.json-generator.com/api/json/get/4ytyBoLK8`,
    //     {
    //       body: file,
    //     },
    //   )
    //   .pipe(map((res) => res.thumbnail));
  };

  action = (file: NzUploadFile): string | Observable<string> => {
    console.log('FILE', file);
    return of('string');
  };
}

// @Component({
//   selector: 'nz-demo-upload-picture-card',
//   standalone: true,
//   imports: [NzIconModule, NzModalModule, NzUploadModule],
//   template: `
//     <nz-upload
//       nzAction="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//       nzListType="picture-card"
//       [(nzFileList)]="fileList"
//       [nzShowButton]="fileList.length < 8"
//       [nzPreview]="handlePreview"
//     >
//       <div>
//         <span nz-icon nzType="plus"></span>
//         <div style="margin-top: 8px">Upload</div>
//       </div>
//     </nz-upload>
//     <nz-modal
//       [nzVisible]="previewVisible"
//       [nzContent]="modalContent"
//       [nzFooter]="null"
//       (nzOnCancel)="previewVisible = false"
//     >
//       <ng-template #modalContent>
//         <img [src]="previewImage" style="width: 100%" />
//       </ng-template>
//     </nz-modal>
//   `
// })
// export class NzDemoUploadPictureCardComponent {
//   fileList: NzUploadFile[] = [
//     {
//       uid: '-1',
//       name: 'image.png',
//       status: 'done',
//       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
//     },
//     {
//       uid: '-2',
//       name: 'image.png',
//       status: 'done',
//       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
//     },
//     {
//       uid: '-3',
//       name: 'image.png',
//       status: 'done',
//       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
//     },
//     {
//       uid: '-4',
//       name: 'image.png',
//       status: 'done',
//       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
//     },
//     {
//       uid: '-xxx',
//       percent: 50,
//       name: 'image.png',
//       status: 'uploading',
//       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
//     },
//     {
//       uid: '-5',
//       name: 'image.png',
//       status: 'error'
//     }
//   ];
//   previewImage: string | undefined = '';
//   previewVisible = false;

//   handlePreview = async (file: NzUploadFile): Promise<void> => {
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj!);
//     }
//     this.previewImage = file.url || file.preview;
//     this.previewVisible = true;
//   };
// }
