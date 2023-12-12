import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ServidorService } from 'src/app/services/servidor.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-database',
  templateUrl: './create-database.component.html',
  styleUrls: ['./create-database.component.scss']
})
export class CreateDatabaseComponent {

  database: any;
  servidor: any;

  databaseForm = new FormGroup({
    nombre: new FormControl(''),
    transaccionesDia: new FormControl(''),
    transaccionesMes: new FormControl(''),
    servidor_id: new FormControl(''),
  })

  constructor(private databaseService: DatabaseService, private router: Router, private servidorService: ServidorService) {
    
  }

  ngOnInit(): void {
    this.servidorService.listServidores().subscribe(
      servidor => {
        this.servidor = servidor;
      }
    )
  }

  onSubmit() {
    this.databaseService.addDatabase(this.databaseForm.value).subscribe(
      database => {
        this.database = database
        this.router.navigate(['list/database']);
      }
    )
  }

}