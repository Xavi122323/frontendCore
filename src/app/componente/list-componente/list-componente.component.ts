import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ComponenteService } from 'src/app/services/componente.service';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list-componente',
  templateUrl: './list-componente.component.html',
  styleUrls: ['./list-componente.component.scss']
})
export class ListComponenteComponent implements AfterViewInit {

  componente: any;
  servidorFilter: string | undefined;

  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private componenteService: ComponenteService, private router: Router) {}

  ngAfterViewInit(): void {
    this.componenteList();
  }

  applyFilters() {
    const filters: {servidor?: string, page?: number, limit?: number} = {};
    if (this.servidorFilter) filters['servidor'] = this.servidorFilter;
  
    this.componenteList(filters);
  }

  handlePageEvent(event: PageEvent) {
    const filters: { servidor?: string, page?: number, limit?: number } = {};
    if (this.servidorFilter) filters['servidor'] = this.servidorFilter;

    filters.page = event.pageIndex + 1;
    filters.limit = event.pageSize;
  
    this.componenteList(filters);
  }

  componenteList(filters: any = {}) {
  const page = filters.page || 1;
  const limit = filters.limit || this.pageSize;

  // Call the service with the filters
  this.componenteService.listComponentes({ ...filters, page, limit }).subscribe(
    (response) => {
      this.length = response.total_count;
      
      this.componente = response.componentes;

      if (this.paginator) {
        this.paginator.pageIndex = page - 1;
        this.paginator.pageSize = limit;
      }
    },
    error => {
      console.error('Error fetching componentes:', error);
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
