import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Import the NgbModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContributorsComponent } from './contributors/contributors.component';

@NgModule({
  declarations: [
    AppComponent,
    ContributorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule // Make sure NgbModule is imported
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
