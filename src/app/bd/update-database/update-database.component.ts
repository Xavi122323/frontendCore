import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { ServidorService } from 'src/app/services/servidor.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-update-database',
  templateUrl: './update-database.component.html',
  styleUrls: ['./update-database.component.scss']
})
export class UpdateDatabaseComponent {

  databaseForm!: FormGroup;
  database: any;
  servidor: any;
  id: any;

  constructor(private databaseService: DatabaseService, private route: ActivatedRoute, private router: Router, private servidorService: ServidorService){
    
  }

  ngOnInit(){
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('databaseID'))
    this.databaseService.findDatabase(this.id).subscribe(
      (database) => {
        this.database=database
        this.databaseForm = new FormGroup({
          nombre: new FormControl(this.database.nombre),
          transacciones: new FormControl(this.database.transacciones),
          fechaTransaccion: new FormControl(this.database.fechaTransaccion),
          servidor_id: new FormControl(this.database.servidor_id),
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
    this.databaseService.editDatabase(this.databaseForm.value, this.id).subscribe(
      (database) =>{
        
      }
    )
    this.router.navigate(['list/database']);
  }

}
