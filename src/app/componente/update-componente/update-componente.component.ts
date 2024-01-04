import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ComponenteService } from 'src/app/services/componente.service';
import { ServidorService } from 'src/app/services/servidor.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-update-componente',
  templateUrl: './update-componente.component.html',
  styleUrls: ['./update-componente.component.scss']
})
export class UpdateComponenteComponent {

  componentForm!: FormGroup;
  component: any;
  servidor: any;
  id: any;

  constructor(private componenteService: ComponenteService, private route: ActivatedRoute, private router: Router, private servidorService: ServidorService){

  }

  ngOnInit(){
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('componenteID'))
    this.componenteService.findComponente(this.id).subscribe(
      (component) => {
        this.component=component
        this.componentForm = new FormGroup({
          nroCPU: new FormControl(this.component.nroCPU),
          memoria: new FormControl(this.component.memoria),
          almacenamiento: new FormControl(this.component.almacenamiento),
          servidor_id: new FormControl(this.component.servidor_id),
        });
      }
    );
    this.servidorService.listServidores().subscribe(
      response => {
        this.servidor = response.servidores;
      },
      error => {
        console.error('Error fetching servidores:', error);
      }
    );
  }

  onSubmit(){
    this.componenteService.editComponente(this.componentForm.value, this.id).subscribe(
      (component) =>{
        
      }
    )
    this.router.navigate(['list/componente']);
  }

}
