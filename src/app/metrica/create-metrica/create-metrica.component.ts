import { Component, OnInit } from '@angular/core';
import { MetricaService } from 'src/app/services/metrica.service';
import { ServidorService } from 'src/app/services/servidor.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-metrica',
  templateUrl: './create-metrica.component.html',
  styleUrls: ['./create-metrica.component.scss']
})
export class CreateMetricaComponent {

  metrica: any
  servidor: any

  metricaForm = new FormGroup({
    usoCPU: new FormControl(''),
    usoMemoria: new FormControl(''),
    usoAlmacenamiento: new FormControl(''),
    fechaRecoleccion: new FormControl(''),
    servidor_id: new FormControl(''),
  })

  constructor(private metricaService: MetricaService, private router: Router, private servidorService: ServidorService) {
    
  }

  ngOnInit(): void {
    this.servidorService.listServidores().subscribe(
      response => {
        this.servidor = response.servidores;
      },
      error => {
        console.error('Error fetching servidores:', error);
      }
    )
  }

  onSubmit() {
    this.metricaService.addMetrica(this.metricaForm.value).subscribe(
      metrica => {
        this.metrica = metrica
        console.log(this.metrica)
        this.router.navigate(['list/metrica'])
      }
    )
  }

}
