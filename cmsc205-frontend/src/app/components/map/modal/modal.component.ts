import { Component, inject, ViewChild } from '@angular/core';
import { JsonPipe } from '@angular/common';

import { MarkerDetailsInputFormComponent } from '../marker-details-input-form/marker-details-input-form.component';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { ModalService } from '../../../services/modal.service';
import { PositionService } from '../../../services/position.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    NzButtonModule,
    NzModalModule,
    MarkerDetailsInputFormComponent,
    JsonPipe,
  ],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  ms = inject(ModalService);
  ps = inject(PositionService);
  positionInput!: google.maps.LatLngLiteral | null;
  isVisible: boolean = false;
  isOkLoading = false;

  @ViewChild(MarkerDetailsInputFormComponent)
  inputFormComp!: MarkerDetailsInputFormComponent;

  ngOnInit(): void {
    this.ms.isVisible$.subscribe((value) => {
      this.isVisible = value;
    });

    this.ps.positionInput$.subscribe((value) => {
      this.positionInput = value;
    });
  }

  handleOk(): void {
    if (this.inputFormComp.inputForm.valid) {
      console.log(this.inputFormComp.inputForm.value);
      console.log(this.positionInput);
      this.inputFormComp.inputForm.reset();
      this.isOkLoading = true;
      setTimeout(() => {
        this.ms.isVisible$.next(false);
        this.isOkLoading = false;
      }, 3000);
    } else {
      Object.values(this.inputFormComp.inputForm.controls).forEach(
        (control) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        },
      );
    }
  }

  handleCancel(): void {
    this.inputFormComp.inputForm.reset();
    this.ms.isVisible$.next(false);
  }
}
