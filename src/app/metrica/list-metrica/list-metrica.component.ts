import { Component, ViewChild, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { MetricaService } from 'src/app/services/metrica.service';
import { DatePipe } from '@angular/common';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list-metrica',
  templateUrl: './list-metrica.component.html',
  styleUrls: ['./list-metrica.component.scss'],
  providers: [DatePipe]
})
export class ListMetricaComponent implements AfterViewInit {

  metricas: any;
  servidorFilter: string | undefined;
  fechaRecoleccionFilter: string | undefined;

  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private metricaService: MetricaService, private router: Router, private datePipe: DatePipe) {}

  ngAfterViewInit(): void {
    this.metricaList();
  }

  applyFilters() {
    const filters: {servidor?: string, fechaRecoleccion?: string} = {};

    if (this.servidorFilter) filters['servidor'] = this.servidorFilter;
    if (this.fechaRecoleccionFilter) filters['fechaRecoleccion'] = this.fechaRecoleccionFilter;
  
    this.metricaList(filters);
  }

  handlePageEvent(event: PageEvent) {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;

    this.metricaList({ pageIndex, pageSize });
  }

  metricaList(filters: any = {}) {
    if (this.paginator) {
      filters.page = this.paginator.pageIndex + 1;
      filters.limit = this.paginator.pageSize;
    } else {
      filters.page = 1;
      filters.limit = this.pageSize;
    }
  
    this.metricaService.listMetricas(filters).subscribe(
      (response) => {
        this.length = response.total_count;

        this.metricas = response.metricas.map((metrica: { fechaRecoleccion: string | number | Date; }) => ({
          ...metrica,
          fechaRecoleccion: this.datePipe.transform(metrica.fechaRecoleccion, 'yyyy-MM-dd HH:mm')
        }));

        if (this.paginator) {
          this.paginator.pageIndex = filters.page - 1;
          this.paginator.pageSize = filters.limit;
        }
      },
      error => {
        console.error('Error fetching metricas:', error);
      }
    );
  }
  

  deleteMetrica(id: any){
    this.metricaService.deleteMetrica(id).subscribe(
      metrica => {
        this.metricaList();
      }
    )
  }

  editMetrica(id: any){
    this.router.navigate(['edit/metrica', id])
  }

  createMetrica(){
    this.router.navigate(['create/metrica'])
  }

}
