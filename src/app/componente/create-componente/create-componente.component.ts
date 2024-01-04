import { Component, OnInit } from '@angular/core';
import { ComponenteService } from 'src/app/services/componente.service';
import { ServidorService } from 'src/app/services/servidor.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-componente',
  templateUrl: './create-componente.component.html',
  styleUrls: ['./create-componente.component.scss']
})
export class CreateComponenteComponent implements OnInit {

  componente: any;
  servidor: any;

  componenteForm = new FormGroup({
    nroCPU: new FormControl(''),
    memoria: new FormControl(''),
    almacenamiento: new FormControl(''),
    servidor_id: new FormControl(''),
  })

  constructor(private componenteService: ComponenteService, private router: Router, private servidorService: ServidorService) {
    
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
  

  onSubmit(){
    this.componenteService.addComponente(this.componenteForm.value).subscribe(
      componente => {
        this.componente = componente
      }
    )
    this.router.navigate(['list/componente']);
  }

}
