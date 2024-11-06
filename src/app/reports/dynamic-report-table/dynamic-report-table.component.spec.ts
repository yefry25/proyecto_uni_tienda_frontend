import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicReportTableComponent } from './dynamic-report-table.component';

describe('DynamicReportTableComponent', () => {
  let component: DynamicReportTableComponent;
  let fixture: ComponentFixture<DynamicReportTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicReportTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicReportTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
