import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ConsultasService } from 'src/app/services/consultas.service';
import { ServidorService } from 'src/app/services/servidor.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-uso-cpu',
  templateUrl: './uso-cpu.component.html',
  styleUrls: ['./uso-cpu.component.scss']
})
export class UsoCPUComponent {

  serverId: any;
  startDate: string = '';
  endDate: string = '';
  chartData: any;
  servidor: any;

  constructor(private consultasService: ConsultasService, private servidorService: ServidorService) {}

  fetchData() {
    this.consultasService.getAverageCpuUsage(this.serverId, this.startDate, this.endDate)
      .subscribe(data => {
        console.log(data);
        // Here you would process the data and update the chart
      });
  }

  ngOnInit(): void {
    this.servidorService.listServidores().subscribe(
      servidor => {
        this.servidor = servidor;
      }
    )
  }

}
