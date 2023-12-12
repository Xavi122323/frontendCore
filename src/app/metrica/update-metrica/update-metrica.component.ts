import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MetricaService } from 'src/app/services/metrica.service';
import { ServidorService } from 'src/app/services/servidor.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-update-metrica',
  templateUrl: './update-metrica.component.html',
  styleUrls: ['./update-metrica.component.scss']
})
export class UpdateMetricaComponent {

  metricaForm!: FormGroup;
  metrica: any;
  servidor: any;
  id: any;

  constructor(private metricaService: MetricaService, private route: ActivatedRoute, private router: Router, private servidorService: ServidorService){
    
  }

  ngOnInit(){
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('metricaID'))
    this.metricaService.findMetrica(this.id).subscribe(
      (metrica) => {
        this.metrica=metrica
        this.metricaForm = new FormGroup({
          usoCPU: new FormControl(this.metrica.usoCPU),
          usoMemoria: new FormControl(this.metrica.usoMemoria),
          usoAlmacenamiento: new FormControl(this.metrica.usoAlmacenamiento),
          fechaRecoleccion: new FormControl(this.metrica.fechaRecoleccion),
          servidor_id: new FormControl(this.metrica.servidor_id),
        });
      }
    );
    this.servidorService.listServidores().subscribe(
      servidor => {
        this.servidor = servidor;
      }
    );
  }

  onSubmit(){
    this.metricaService.editMetrica(this.metricaForm.value, this.id).subscribe(
      (metrica) =>{
        
      }
    )
    this.router.navigate(['list/metrica']);
  }

}
