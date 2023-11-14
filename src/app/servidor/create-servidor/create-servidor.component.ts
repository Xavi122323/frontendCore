import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ServidorService } from 'src/app/services/servidor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-servidor',
  templateUrl: './create-servidor.component.html',
  styleUrls: ['./create-servidor.component.scss']
})
export class CreateServidorComponent {

  server: any;

  serverForm = new FormGroup({
    nombre: new FormControl(''),
    direccionIP: new FormControl(''),
    SO: new FormControl(''),
    motorBase: new FormControl('')
  })

  constructor(private servidorService: ServidorService, private router: Router){}

  onSubmit(){
    this.servidorService.addServidor(this.serverForm.value).subscribe(
      server => {
        this.server = server
      }
    )
    this.router.navigate(['list/server']);
  }

}
