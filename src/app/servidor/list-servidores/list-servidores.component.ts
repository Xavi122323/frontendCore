import { Component } from '@angular/core';
import { ServidorService } from 'src/app/services/servidor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-servidores',
  templateUrl: './list-servidores.component.html',
  styleUrls: ['./list-servidores.component.scss']
})
export class ListServidoresComponent {

  servidor: any;

  constructor(private servidorService: ServidorService, private router: Router){

  }

  ngOnInit(){
    this.serverList();
  }

  serverList(){
    this.servidorService.listServidores().subscribe(
      servidor => {
        this.servidor = servidor;
      }
    )
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
