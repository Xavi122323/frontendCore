import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ConsultasService } from 'src/app/services/consultas.service';
import { ServidorService } from 'src/app/services/servidor.service';
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
          console.log('Average CPU usage fetched successfully');
        },
        error: (err) => {
          this.errorMessage = err.message;
          console.log('Error fetching average CPU usage:', err.message);
        }
      });
  
    this.consultasService.getCpuUsage(this.serverId, this.startDate, this.endDate)
      .subscribe({
        next: (data) => {
          this.metricas = data;
          this.createChart(this.metricas);
          this.errorMessage = '';
          console.log('CPU usage fetched successfully');
        },
        error: (err) => {
          this.errorMessage = err.message;
          if (this.chart) {
            this.chart.destroy();
            this.chart = null;
          }
          console.log('Error fetching CPU usage:', err.message);
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

  createChart(baseData: any[]) {
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

    if (!Array.isArray(baseData)) {
      console.error('metricaData is not an array');
      return;
    }

    if (this.chart) {
      this.chart.destroy();
    }
  
    const labels = baseData.map(row => row.nombre);
    const data = baseData.map(row => row.total_transacciones);
  
    const chartData = {
      labels: labels,
      datasets: [{
        label: 'Transacciones',
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
