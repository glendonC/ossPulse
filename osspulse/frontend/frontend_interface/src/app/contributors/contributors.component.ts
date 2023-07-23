import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contributor } from '../models/contributors';
import { ContributionForecast } from '../models/contributionforecase';
import { Chart, registerables, ChartTypeRegistry } from 'chart.js';
import { ContributorsService } from './contributors.service';
import * as regression from 'regression';

// DataPoint -> Tuple of numbers
type DataPoint = [number, number];

@Component({
  selector: 'app-contributors',
  templateUrl: './contributors.component.html',
  styleUrls: ['./contributors.component.css']
})
export class ContributorsComponent implements OnInit {
  contributors: Contributor[] = []; // Stores contributor data
  chart: Chart | null = null; // stores chart instance
  meanContributions: number = 0; // stores mean contribution value
  medianContributions: number = 0; // stores median contribution value
  groupedContributors: any[] = []; // groups contributors into list
  contributionForecast: ContributionForecast[] = []; // groups forecasts into list

  // Groups contributors into certain size for the carousel effect
  groupContributors(contributors: any[], groupSize: number): any[] {
    const groupedContributors = [];
    for (let i = 0; i < contributors.length; i += groupSize) {
      groupedContributors.push(contributors.slice(i, i + groupSize));
    }
    return groupedContributors;
  }

  // Define types of charts to choose from
  validChartTypes: Array<keyof ChartTypeRegistry> = ['bar', 'line', 'pie', 'doughnut', 'polarArea'];

  // Default type of chart
  chartType: keyof ChartTypeRegistry = 'bar';

  constructor(private http: HttpClient, private contributorsService: ContributorsService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    // Fetch contributors data from the service
    this.contributorsService.getContributors().subscribe(
      (data) => {
        this.contributors = data;
        this.groupedContributors = this.groupContributors(this.contributors, 3); // Group contributors into sets of 3 at a time
        this.createChart(); // make the contributor chart
        this.predictContributionsTrends(); // predict future contributions by leveraging linear regression
        this.contributionForecast = this.calculateContributionForecast(this.contributionForecast); // calculate the rate of change for each contribution forecast
      },
      (error) => {
        console.error('Error fetching contributors:', error);
      }
    );
  }

  // Function to create the Contribution chart
  createChart(): void {
    const ctx = document.getElementById('contributionsChart') as HTMLCanvasElement;
    // Destroy the previous chart if it exists to avoid conflicts
    if (this.chart) {
      this.chart.destroy();
    }
    const contributionsData = this.contributors.map((contributor) => contributor.contributions);
    const contributorsNames = this.contributors.map((contributor) => contributor.login);
    const colors = this.generateDistinctColors(this.contributors.length); // Generate distinct colors for each user
    this.chart = new Chart(ctx, {
      type: this.chartType, // use selected chart type
      data: {
        labels: contributorsNames,
        datasets: [
          {
            label: 'Contributions',
            data: contributionsData,
            backgroundColor: colors, // apply distinct color to each yser
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

  // Function to predict contributions by leveraging linear regression
  predictContributionsTrends(): void {
    const contributionsData = this.contributors.map((contributor) => contributor.contributions); // get contributions data
    this.meanContributions = contributionsData.reduce((a, b) => a + b, 0) / contributionsData.length; // calculate mean contributions
    this.medianContributions = contributionsData.sort((a, b) => a - b)[Math.floor(contributionsData.length / 2)]; // calculate median contributions

    // perform linear regression
    const dataPoints: DataPoint[] = contributionsData.map((contribution, index) => [index, contribution]);
    const result = regression.linear(dataPoints);
    const slope = result.equation[0];
    const intercept = result.equation[1];

    // predict future contribution stats and the rate of change between those years
    if (contributionsData.length >= 2) {
      const futureContributions: number[] = Array.from({ length: 3 }, (_, i) => this.contributors.length + i);
      this.contributionForecast = futureContributions.map((x, i) => {
        const forecast = slope * x + intercept;
        const rateOfChange = ((forecast - contributionsData[contributionsData.length - 1]) / contributionsData[contributionsData.length - 1]) * 100;
        return { contributions: forecast, rateOfChange: rateOfChange };
      });
    }
    console.log('Contributions forecast:', this.contributionForecast);
  }

  // calculates rate of change between forecasted years
  calculateContributionForecast(contributions: ContributionForecast[]): ContributionForecast[] {
    const forecastData: ContributionForecast[] = [];
    for (let i = 1; i < contributions.length; i++) {
      const currentYearContribution = contributions[i].contributions;
      const previousYearContribution = contributions[i - 1].contributions;
      const rateOfChange = ((currentYearContribution - previousYearContribution) / previousYearContribution) * 100;
      forecastData.push({ contributions: currentYearContribution, rateOfChange: rateOfChange });
    }
    return forecastData;
  }

  // Function to generate distinct color for each contributing user
  generateDistinctColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      const hue = (i * 137.5) % 360;
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
