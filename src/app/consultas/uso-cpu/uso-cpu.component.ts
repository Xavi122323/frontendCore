import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ConsultasService } from 'src/app/services/consultas.service';
import { ServidorService } from 'src/app/services/servidor.service';
//import { Chart } from 'chart.js';
import { Chart } from 'chart.js/auto';

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
  metricas: any = [];
  chart: Chart | null = null;
  errorMessage: string = '';
  averageCpuUsage: number | null = null;

  constructor(private consultasService: ConsultasService, private servidorService: ServidorService) {}

  fetchData() {
    this.consultasService.getAverageCpuUsage(this.serverId, this.startDate, this.endDate)
      .subscribe({
        next: (avgData) => {
          this.averageCpuUsage = avgData.average_cpu;
          this.errorMessage = '';
        },
        error: (err) => {
          this.errorMessage = err.message;
        }
      });

    this.consultasService.getCpuUsage(this.serverId, this.startDate, this.endDate)
      .subscribe({
        next: (data) => {
          this.metricas = data;
          this.createChart(this.metricas);
          this.errorMessage = '';
        },
        error: (err) => {
          this.errorMessage = err.message;
          if (this.chart) {
            this.chart.destroy();
            this.chart = null;
          }
        }
      });
  }

  ngOnInit(): void {
    this.servidorService.listServidores().subscribe(
      servidor => {
        this.servidor = servidor;
      }
    )
  }

  createChart(metricaData: any[]) {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Rendering context not found');
      return;
    }
  
    if (!canvas) {
      console.error('Canvas element not found');
      return;
    }

    if (!Array.isArray(metricaData)) {
      console.error('metricaData is not an array');
      return;
    }

    if (this.chart) {
      this.chart.destroy();
    }
  
    const labels = metricaData.map(row => row.fechaRecoleccion);
    const data = metricaData.map(row => row.usoCPU);
  
    const chartData = {
      labels: labels,
      datasets: [{
        label: 'CPU Usage',
        data: data,
      }]
    };
  
    const config = {
      type: 'line' as const,
      data: chartData,
      options: {}
    };
  
    this.chart = new Chart(ctx, config);
  }

}
