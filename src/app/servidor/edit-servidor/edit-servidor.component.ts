import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ServidorService } from 'src/app/services/servidor.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-edit-servidor',
  templateUrl: './edit-servidor.component.html',
  styleUrls: ['./edit-servidor.component.scss']
})
export class EditServidorComponent {

  serverForm!: FormGroup;
  server: any;
  id: any;

  constructor(private servidorService: ServidorService, private route: ActivatedRoute, private router: Router){

  }

  ngOnInit(){
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('serverID'))
    this.servidorService.findServidor(this.id).subscribe(
      (server) => {
        this.server=server
        this.serverForm = new FormGroup({
          nombre: new FormControl(this.server.nombre),
          direccionIP: new FormControl(this.server.direccionIP),
          SO: new FormControl(this.server.SO),
          motorBase: new FormControl(this.server.motorBase)
        });
      }
    )
  }

  onSubmit(){
    this.servidorService.editServidor(this.serverForm.value, this.id).subscribe(
      (server) =>{
        
      }
    )
    this.router.navigate(['list/server']);
  }

}
