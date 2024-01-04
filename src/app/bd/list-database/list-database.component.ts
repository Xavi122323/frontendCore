import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list-database',
  templateUrl: './list-database.component.html',
  styleUrls: ['./list-database.component.scss']
})
export class ListDatabaseComponent implements AfterViewInit {

  databases: any;
  nombreFilter: string | undefined;
  servidorFilter: string | undefined;
  fechaRecoleccionFilter: string | undefined;

  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private databaseService: DatabaseService, private router: Router) {}

  ngAfterViewInit(): void {
    this.databaseList();
  }

  applyFilters() {
    const filters: {nombre?: string, servidor?: string, fechaRecoleccion?: string, page?: number, limit?: number} = {};

    if (this.nombreFilter) filters['nombre'] = this.nombreFilter;
    if (this.servidorFilter) filters['servidor'] = this.servidorFilter;
    if (this.fechaRecoleccionFilter) filters['fechaRecoleccion'] = this.fechaRecoleccionFilter;

    this.databaseList(filters);
  }

  handlePageEvent(event: PageEvent) {
    const filters: {nombre?: string, servidor?: string, fechaRecoleccion?: string, page?: number, limit?: number} = {};

    if (this.nombreFilter) filters['nombre'] = this.nombreFilter;
    if (this.servidorFilter) filters['servidor'] = this.servidorFilter;
    if (this.fechaRecoleccionFilter) filters['fechaRecoleccion'] = this.fechaRecoleccionFilter;

    filters.page = event.pageIndex + 1;
    filters.limit = event.pageSize;
  
    this.databaseList(filters);
  }

  databaseList(filters: any = {}) {
    const page = filters.page || 1;
    const limit = filters.limit || this.pageSize;

    this.databaseService.listDatabase({... filters, page, limit }).subscribe(
      (response) => {
        this.length = response.total_count;

        this.databases = response.databases;

        if (this.paginator) {
          this.paginator.pageIndex = page - 1;
          this.paginator.pageSize = limit;
        }
      },
      error => {
        console.error('Error fetching databases:', error);
      }
    );
  }

  deleteDatabase(id: any){
    this.databaseService.deleteDatabase(id).subscribe(
      (database) => {
        this.databaseList();
      }
    )
  }

  editDatabase(id: any){
    this.router.navigate(['edit/database/'+id]);
  }

  createDatabase(){
    this.router.navigate(['create/database']);
  }

}
