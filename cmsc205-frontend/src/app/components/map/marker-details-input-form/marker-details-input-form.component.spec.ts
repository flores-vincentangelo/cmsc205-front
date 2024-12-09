import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkerDetailsInputFormComponent } from './marker-details-input-form.component';

describe('MarkerDetailsInputFormComponent', () => {
  let component: MarkerDetailsInputFormComponent;
  let fixture: ComponentFixture<MarkerDetailsInputFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkerDetailsInputFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MarkerDetailsInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
