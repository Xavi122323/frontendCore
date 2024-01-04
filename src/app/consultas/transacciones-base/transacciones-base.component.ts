import { Component, OnInit } from '@angular/core';
import { ConsultasService } from 'src/app/services/consultas.service';
import { ServidorService } from 'src/app/services/servidor.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-transacciones-base',
  templateUrl: './transacciones-base.component.html',
  styleUrls: ['./transacciones-base.component.scss']
})
export class TransaccionesBaseComponent implements OnInit{

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
  errorMessage: string = '';
  chart: Chart | null = null;
  averageTransactions: number | null = null;
  allDatabaseNames: any[] = [];
  filterdatabases: any[] = [];

  constructor(private consultasService: ConsultasService, private servidorService: ServidorService, private databaseService: DatabaseService) { }

  ngOnInit() {
    this.fetchDatabaseNames();
    this.fetchServers();
  }

  fetchDatabaseNames(servidorId?: number) {
    this.databaseService.listUniqueDatabaseNames(servidorId).subscribe(
      data => {
        this.allDatabaseNames = data;
        this.filterDatabasesByServer();
      },
      error => console.error('Error fetching unique database names', error)
    );
  }

  onServerSelectionChange() {
    console.log('Server selection changed:', this.selectedServer);
    this.filterDatabasesByServer();
  }
  
  filterDatabasesByServer() {
    if (this.selectedServer !== undefined) {  // Check that selectedServer is not undefined
      this.databaseNames = this.allDatabaseNames.filter(database => 
        database.server_id === Number(this.selectedServer)  // Ensure both are of the same type
      );
    } else {
      this.databaseNames = [...this.allDatabaseNames];
    }
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
      data => this.servers = data.servidores,
      error => console.error('Error fetching servers', error)
    );
  }

  onSearch(): void {
    const selectedNamesArray = Array.from(this.selectedDatabases);

    this.consultasService.getAverageTransactions(selectedNamesArray, this.selectedServer, this.startDate, this.endDate)
      .subscribe({
        next: (data) => {
          this.averageTransactions = data.sum;
          this.errorMessage = '';
          console.log('Average CPU usage fetched successfully');
        },
        error: (err) => {
          this.errorMessage = err.message;
          console.log('Error fetching average CPU usage:', err.message);
        }
      });

    this.consultasService.getTransactionTotals(selectedNamesArray, this.selectedServer, this.startDate, this.endDate)
      .subscribe({
        next: (data) => {
          this.transactionTotals = data;
          this.errorMessage = '';
          setTimeout(() => {
            this.createChart(this.transactionTotals);
          }, 0);
          console.log('Average CPU usage fetched successfully');
        },
        error: (err) => {
          this.errorMessage = err.message;
          if (this.chart) {
            this.chart.destroy();
            this.chart = null;
          }
          console.log('Error fetching average CPU usage:', err.message);
        }
      });
  }

  clearFilters(): void {
    this.selectedDatabases.clear();
    this.selectedServer = undefined;
    this.startDate = undefined;
    this.endDate = undefined;
    this.fetchDatabaseNames();
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
