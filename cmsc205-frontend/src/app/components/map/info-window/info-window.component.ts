import { Component, Input } from '@angular/core';
import { NzImageModule } from 'ng-zorro-antd/image';
import { MarkerData } from '../../../models/marker';

@Component({
  selector: 'app-info-window',
  standalone: true,
  imports: [NzImageModule],
  templateUrl: './info-window.component.html',
  styleUrl: './info-window.component.css',
})
export class InfoWindowComponent {
  @Input() markerData!: MarkerData | undefined;
  imgSrc: string =
    'https://t3.ftcdn.net/jpg/02/74/06/48/360_F_274064877_Tuq84kGOn5nhyIJeUFTUSvXaSeedAOTT.jpg';

  markerUserImg(): string {
    return this.markerData?.userImage ? this.markerData.userImage : this.imgSrc;
  }
}
