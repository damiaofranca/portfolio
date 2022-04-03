import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundWindowComponent } from './components/background-window.component';



@NgModule({
  declarations: [
    BackgroundWindowComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BackgroundWindowComponent
  ]
})
export class BackgroundWindowModule { }
