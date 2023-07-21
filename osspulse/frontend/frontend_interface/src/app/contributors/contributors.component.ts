import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Contributor {
  name: string;
  contributions: number;
}

interface ContributorsResponse {
  contributors: Contributor[];
}

@Component({
  selector: 'app-contributors',
  templateUrl: './contributors.component.html',
  styleUrls: ['./contributors.component.css']
})
export class ContributorsComponent implements OnInit {
  contributors: Contributor[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<ContributorsResponse>('http://localhost:4200/api/contributors').subscribe(data => {
      this.contributors = data.contributors;
    });
  }
}
