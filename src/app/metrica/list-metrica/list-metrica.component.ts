import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MetricaService } from 'src/app/services/metrica.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-metrica',
  templateUrl: './list-metrica.component.html',
  styleUrls: ['./list-metrica.component.scss'],
  providers: [DatePipe]
})
export class ListMetricaComponent {

  metricas: any;
  servidorFilter: string | undefined;
  fechaRecoleccionFilter: string | undefined;

  constructor(private metricaService: MetricaService, private router: Router, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.metricaList();
  }

  /*metricaList(){
    this.metricaService.listMetricas().subscribe((data) => {
      this.metricas = data;
    })
  }*/

  applyFilters() {
    const filters: {servidor?: string, fechaRecoleccion?: string} = {};

    if (this.servidorFilter) filters['servidor'] = this.servidorFilter;
    if (this.fechaRecoleccionFilter) filters['fechaRecoleccion'] = this.fechaRecoleccionFilter;
  
    this.metricaList(filters);
  }

  metricaList(filters?: any) {
    this.metricaService.listMetricas(filters).subscribe(
      (metricas) => {
        // Use DatePipe to format each fechaRecoleccion
        this.metricas = metricas.map((metrica: any) => ({
          ...metrica,
          fechaRecoleccion: this.datePipe.transform(metrica.fechaRecoleccion, 'yyyy-MM-dd HH:mm')
        }));
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
