import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BackgroundWindowModule } from './@core/background-window';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BackgroundWindowModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
