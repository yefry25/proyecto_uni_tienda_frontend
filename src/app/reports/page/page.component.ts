import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReportService } from '../../core/services/report.service';
import { DynamicReportTableComponent } from '../dynamic-report-table/dynamic-report-table.component';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [DynamicReportTableComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent {
  currentData: any[] = [];
  currentColumns: { header: string; field: string }[] = [];

  constructor(private reportService: ReportService) { }

  changeReportType(type: string) {
    this.reportService.GetProductReports(type).subscribe({
      next: (data) => {
        this.currentData = data.items;
        this.currentColumns = data.columns;
      },
      error: () => {

      }
    });
  }
}
