import { Component } from '@angular/core';
import { ReportService } from '../../core/services/report.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {
  reports: any[] = []

  constructor(private reportService: ReportService) { }

  SalesByProduct():void {
    this.reportService.GetReportOfSalesByProduct().subscribe({
      next: (data) => {
        this.reports = data;
      },
      error: () => {

      }
    })
  }
}
