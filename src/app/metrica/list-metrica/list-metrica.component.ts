import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MetricaService } from 'src/app/services/metrica.service';

@Component({
  selector: 'app-list-metrica',
  templateUrl: './list-metrica.component.html',
  styleUrls: ['./list-metrica.component.scss']
})
export class ListMetricaComponent {

  metricas: any;
  servidorFilter: string | undefined;
  fechaRecoleccionFilter: string | undefined;

  constructor(private metricaService: MetricaService, private router: Router) {}

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
        this.metricas = metricas;
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
