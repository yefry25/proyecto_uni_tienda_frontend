import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-report-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dynamic-report-table.component.html',
  styleUrl: './dynamic-report-table.component.scss'
})
export class DynamicReportTableComponent {
  @Input() data: any[] = []; // Datos del reporte
  @Input() columns: { header: string; field: string }[] = []; // Configuración de columnas
}
