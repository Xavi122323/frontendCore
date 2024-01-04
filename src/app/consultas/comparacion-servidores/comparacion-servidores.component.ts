import { Component } from '@angular/core';
import { ConsultasService } from 'src/app/services/consultas.service';
import { ServidorService } from 'src/app/services/servidor.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-comparacion-servidores',
  templateUrl: './comparacion-servidores.component.html',
  styleUrls: ['./comparacion-servidores.component.scss']
})
export class ComparacionServidoresComponent {

  startDate: string | undefined;
  endDate: string | undefined;
  selectedServers: number[] = [];
  selectedParams: string[] = [];
  comparisonResults: any = null;
  servidor: any;
  errorMessage: string = '';
  chart: Chart | null = null;
  summary: any = null;
  serverComparisons: any = null;

  constructor(private consultasService: ConsultasService, private servidorService: ServidorService) { }

  ngOnInit(): void {
    this.servidorService.listServidores().subscribe(
      response => {
        this.servidor = response.servidores;
      },
      error => {
        console.error('Error fetching servidores:', error);
      }
    );
  }

  onSubmit() {
    const comparisonData = {
      comparison: {
        server_ids: this.selectedServers,
        params: this.selectedParams,
        start_date: this.startDate,
        end_date: this.endDate
      }
    };

    this.consultasService.compareServers(comparisonData)
      .subscribe({
        next: (data) => {
          this.comparisonResults = data.comparison_results;
          this.summary = data.summary;
          this.serverComparisons = data.server_comparisons;
          this.errorMessage = '';
          this.createChart(this.comparisonResults);
        },
        error: (error) => {
          this.errorMessage = error.message;
          console.error('Error:', this.errorMessage);
        }
      });
  }

  toggleSelection(value: number | string, list: any[]) {
    const index = list.indexOf(value);
    if (index === -1) {
      list.push(value);
    } else {
      list.splice(index, 1);
    }
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
      console.error('baseData is not an array');
      return;
    }
  
    if (this.chart) {
      this.chart.destroy();
    }
  
    // Labels for the radar chart representing the metrics
    const labels = ['CPU', 'Memoria', 'Almacenamiento'];
  
    // Generate a dataset for each server
    const datasets = baseData.map((server, index) => {
      const cpuUsage = server.cpu_usage === 'no_data' ? 0 : server.cpu_usage;
      const memoryUsage = server.memoria_usage === 'no_data' ? 0 : server.memoria_usage;
      const storageUsage = server.almacenamiento_usage === 'no_data' ? 0 : server.almacenamiento_usage;
  
      return {
        label: server.servidor,
        data: [cpuUsage, memoryUsage, storageUsage],
        fill: true,
      };
    });
  
    const chartData = {
      labels: labels,
      datasets: datasets
    };
  
    const config = {
      type: 'radar' as const,
      data: chartData,
      options: {
        elements: {
          line: {
            borderWidth: 3
          }
        },
        scales: {
          r: {
            angleLines: {
              display: false
            },
            suggestedMin: 0,
            suggestedMax: 20 // Adjust as needed based on your data
          }
        }
      }
    };
  
    this.chart = new Chart(ctx, config);
  }
  

}
