import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-list-database',
  templateUrl: './list-database.component.html',
  styleUrls: ['./list-database.component.scss']
})
export class ListDatabaseComponent {

  databases: any;
  nombreFilter: string | undefined;
  servidorFilter: string | undefined;

  constructor(private databaseService: DatabaseService, private router: Router) {}

  ngOnInit(): void {
    this.databaseList();
  }

  /*databaseList(){
    this.databaseService.listDatabase().subscribe((data) => {
      this.databases = data;
    })
  }*/

  applyFilters() {
    const filters: {nombre?: string, servidor?: string } = {};

    if (this.nombreFilter) filters['nombre'] = this.nombreFilter;
    if (this.servidorFilter) filters['servidor'] = this.servidorFilter;
  
    this.databaseList(filters);
  }

  databaseList(filters?: any) {
    this.databaseService.listDatabase(filters).subscribe(
      (databases) => {
        this.databases = databases;
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
