import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contributor } from '../models/contributors';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-contributors',
  templateUrl: './contributors.component.html',
  styleUrls: ['./contributors.component.css']
})
export class ContributorsComponent implements OnInit {
  contributors: Contributor[] = [];

  constructor(private http: HttpClient) {
    // Register Chart.js modules (necessary for some chart types)
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.http.get<Contributor[]>('http://localhost:5000/api/contributors').subscribe(
      data => {
        console.log(data);
        this.contributors = data;
        // Call the function to create charts once the data is fetched
        this.createCharts();
      },
      error => {
        console.error('Error fetching contributors:', error);
      }
    );
  }

  createCharts(): void {
    // Chart.js code to create the visualization
    const ctx = document.getElementById('contributionsChart') as HTMLCanvasElement;
    const contributionsData = this.contributors.map(contributor => contributor.contributions);
    const contributorsNames = this.contributors.map(contributor => contributor.login);

    

    
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: contributorsNames,
        datasets: [{
          label: 'Contributions',
          data: contributionsData,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  
}
