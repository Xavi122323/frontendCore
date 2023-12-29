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
  servidorFilter: string | undefined;

  constructor(private componenteService: ComponenteService, private router: Router) {
  }

  applyFilters() {
    const filters: {servidor?: string } = {};
    if (this.servidorFilter) filters['servidor'] = this.servidorFilter;
  
    this.componenteList(filters);
  }

  ngOnInit(): void {
    this.componenteList();
  }

  componenteList(filters?: any) {
    this.componenteService.listComponentes(filters).subscribe(
      (componente) => {
        this.componente = componente;
      }
    );
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
