import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contributor } from '../models/contributors';

@Component({
  selector: 'app-contributors',
  templateUrl: './contributors.component.html',
  styleUrls: ['./contributors.component.css']
})

export class ContributorsComponent implements OnInit {
  contributors: Contributor[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Contributor[]>('http://localhost:5000/api/contributors').subscribe(
      data => {
        console.log(data);
        this.contributors = data;
      },
      error => {
        console.error('Error fetching contributors:', error);
      }
    );
  }
}
