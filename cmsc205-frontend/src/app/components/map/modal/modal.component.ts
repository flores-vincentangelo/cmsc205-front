import { Component, inject } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ModalService } from '../../../services/modal.service';
import { MarkerDetailsInputFormComponent } from '../marker-details-input-form/marker-details-input-form.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NzButtonModule, NzModalModule, MarkerDetailsInputFormComponent],
  templateUrl: './modal.component.html'
})
export class ModalComponent {
  ms = inject(ModalService)
  isVisible: boolean = false;
  isOkLoading = false;

  ngOnInit(): void {
    this.ms.isVisible$.subscribe(value => {
      this.isVisible = value
    })
  }

  // showModal(): void {
  //   this.isVisible = true;
  // }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.ms.isVisible$.next(false);
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.ms.isVisible$.next(false);
  }
}
