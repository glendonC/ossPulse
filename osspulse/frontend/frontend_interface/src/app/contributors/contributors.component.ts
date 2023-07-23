import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contributor } from '../models/contributors';
import { Chart, registerables, ChartTypeRegistry } from 'chart.js';
import * as regression from 'regression';

import { ContributorsService } from './contributors.service'; // Import the service

// Define the DataPoint type
type DataPoint = [number, number];

@Component({
  selector: 'app-contributors',
  templateUrl: './contributors.component.html',
  styleUrls: ['./contributors.component.css']
})
export class ContributorsComponent implements OnInit {
  contributors: Contributor[] = [];
  chart: Chart | null = null; // Initialize chart property to null
  meanContributions: number = 0;
  medianContributions: number = 0;
  contributionForecast: number[] = [];

  // Define the valid chart types
  validChartTypes: Array<keyof ChartTypeRegistry> = ['bar', 'line', 'pie', 'doughnut', 'polarArea'];

  // Default chart type
  chartType: keyof ChartTypeRegistry = 'bar';

  constructor(private http: HttpClient, private contributorsService: ContributorsService) {
    // Register Chart.js modules (necessary for some chart types)
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    // Fetch contributors data from the service
    this.contributorsService.getContributors().subscribe(
      (data) => {
        this.contributors = data;
        this.createChart();
        this.predictContributionsTrends();
      },
      (error) => {
        console.error('Error fetching contributors:', error);
      }
    );
  }

  createChart(): void {
    // Chart.js code to create the visualization
    const ctx = document.getElementById('contributionsChart') as HTMLCanvasElement;

    // Destroy the previous chart if it exists to avoid conflicts
    if (this.chart) {
      this.chart.destroy();
    }

    const contributionsData = this.contributors.map((contributor) => contributor.contributions);
    const contributorsNames = this.contributors.map((contributor) => contributor.login);

    const colors = this.generateDistinctColors(this.contributors.length);

    this.chart = new Chart(ctx, {
      type: this.chartType, // Use the selected chart type
      data: {
        labels: contributorsNames,
        datasets: [
          {
            label: 'Contributions',
            data: contributionsData,
            backgroundColor: colors, // Use distinct colors for each user
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  predictContributionsTrends(): void {
    // Example: Calculate mean and median of contributions
    const contributionsData = this.contributors.map((contributor) => contributor.contributions);
    this.meanContributions = contributionsData.reduce((a, b) => a + b, 0) / contributionsData.length;
    this.medianContributions = contributionsData.sort((a, b) => a - b)[Math.floor(contributionsData.length / 2)];

    // Perform linear regression on contributions data
    const dataPoints: DataPoint[] = contributionsData.map((contribution, index) => [index, contribution]);
    const result = regression.linear(dataPoints);
    const slope = result.equation[0];
    const intercept = result.equation[1];

    // Predict future contributions
    const futureContributions: number[] = Array.from({ length: 3 }, (_, i) => this.contributors.length + i + 1);
    this.contributionForecast = futureContributions.map((x) => slope * x + intercept);
    console.log('Contributions forecast:', this.contributionForecast);
  }

  // Function to generate distinct colors for each user
  generateDistinctColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      const hue = (i * 137.5) % 360; // Adjust the hue to create distinct colors
      colors.push(`hsl(${hue}, 70%, 50%)`);
    }
    return colors;
  }

  // Function to handle the chart type change from the dropdown
  onChartTypeChange(event: any): void {
    this.chartType = event.target.value;
    this.createChart();
  }
}
