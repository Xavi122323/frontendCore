import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ServidorService } from 'src/app/services/servidor.service';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list-servidores',
  templateUrl: './list-servidores.component.html',
  styleUrls: ['./list-servidores.component.scss']
})
export class ListServidoresComponent implements AfterViewInit{

  servidor: any;
  nameFilter: string | undefined;

  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private servidorService: ServidorService, private router: Router){}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.serverList();
  }

  applyFilters() {
    const filters: { nombre?: string } = {};
    if (this.nameFilter) filters['nombre'] = this.nameFilter;
    this.serverList(filters);
  }

  handlePageEvent(event: PageEvent) {
    const filters: { nombre?: string, page?: number, limit?: number } = {};
    if (this.nameFilter) filters['nombre'] = this.nameFilter;

    filters.page = event.pageIndex + 1;
    filters.limit = event.pageSize;
  
    this.serverList(filters);
  }

  serverList(filters: any = {}) {
    const page = filters.page || 1;
    const limit = filters.limit || this.pageSize;

    this.servidorService.listServidores({ ...filters, page, limit }).subscribe(
      (response) => {
        this.length = response.total_count;
        
        this.servidor = response.servidores;
  
        if (this.paginator) {
          this.paginator.pageIndex = page - 1;
          this.paginator.pageSize = limit;
        }
      },
      error => {
        console.error('Error fetching servidores:', error);
      }
    );
  }

  deleteServer(id:any){
    this.servidorService.deleteServidor(id).subscribe(
      servidor => {
        
      }
    )
    this.serverList();
    this.router.navigate(['list/server']);
  }

  editServer(id:any){
    this.router.navigate(['edit/server/'+id]);
  }

  createServer(){
    this.router.navigate(['create/server']);
  }

}
