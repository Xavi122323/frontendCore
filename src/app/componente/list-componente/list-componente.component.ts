import { Component } from '@angular/core';
import { ComponenteService } from 'src/app/services/componente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-componente',
  templateUrl: './list-componente.component.html',
  styleUrls: ['./list-componente.component.scss']
})
export class ListComponenteComponent {

  componente: any;

  constructor(private componenteService: ComponenteService, private router: Router) {
  }

  ngOnInit(): void {
    this.componenteList();
  }

  componenteList(){
    this.componenteService.listComponentes().subscribe(
      (componente) => {
        this.componente = componente
      }
    )
  }

  deleteComponente(id: any){
    this.componenteService.deleteComponente(id).subscribe(
      (componente) => {
        this.componenteList();
      }
    )
  }

  editComponente(id: any){
    this.router.navigate(['edit/componente/'+id]);
  }

  createComponente(){
    this.router.navigate(['create/componente']);
  }

}
