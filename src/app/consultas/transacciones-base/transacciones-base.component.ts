import { Component } from '@angular/core';
import { ConsultasService } from 'src/app/services/consultas.service';
import { ServidorService } from 'src/app/services/servidor.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-transacciones-base',
  templateUrl: './transacciones-base.component.html',
  styleUrls: ['./transacciones-base.component.scss']
})
export class TransaccionesBaseComponent {

  nombres: string[] = [];
  servidorId?: number;
  startDate?: string;
  endDate?: string;
  transactionTotals: any[] = [];
  databases: any[] = [];
  servers: any[] = [];
  selectedServer?: number;
  databaseNames: any[] = [];
  selectedDatabases: Set<string> = new Set();
  chart: Chart | null = null;

  constructor(private consultasService: ConsultasService, private servidorService: ServidorService, private databaseService: DatabaseService) { }

  ngOnInit() {
    this.fetchDatabaseNames();
    this.fetchServers();
  }

  fetchDatabaseNames() {
    this.databaseService.listDatabaseNames().subscribe(
      data => {
        this.databaseNames = data;
      },
      error => console.error('Error fetching database names', error)
    );
  }

  toggleDatabaseSelection(nombre: string) {
    if (this.selectedDatabases.has(nombre)) {
      this.selectedDatabases.delete(nombre);
    } else {
      this.selectedDatabases.add(nombre);
    }
  }

  fetchServers() {
    this.servidorService.listServidores().subscribe(
      data => this.servers = data,
      error => console.error('Error fetching servers', error)
    );
  }

  onSearch(): void {
    const selectedNamesArray = Array.from(this.selectedDatabases);
    this.consultasService.getTransactionTotals(selectedNamesArray, this.selectedServer, this.startDate, this.endDate)
      .subscribe(
        data => {
          this.transactionTotals = data;
            setTimeout(() => {
            this.createChart(this.transactionTotals);
          }, 0);
        },
        error => {
          console.error('There was an error retrieving the data', error);
        }
      );
  }

  clearFilters(): void {
    this.selectedDatabases.clear();
    this.selectedServer = undefined;
    this.startDate = undefined;
    this.endDate = undefined;
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
  
    const labels = metricaData.map(row => row.nombre);
    const data = metricaData.map(row => row.total_transacciones);
  
    const chartData = {
      labels: labels,
      datasets: [{
        label: 'Uso CPU',
        data: data,
      }]
    };
  
    const config = {
      type: 'pie' as const,
      data: chartData,
      options: {}
    };
  
    this.chart = new Chart(ctx, config as any);
  }

}
