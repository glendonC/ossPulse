import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Import NgbModule

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgbModule], // Add NgbModule to the imports array
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
