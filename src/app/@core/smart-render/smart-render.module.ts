import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SmartRenderComponent } from './components/smart-render.component';
import { StringTemplateRefRenderDirective } from './directives/string-template-ref-render.directive';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SmartRenderComponent,
    StringTemplateRefRenderDirective
  ],
  providers: [],
  exports: [
    SmartRenderComponent,
    StringTemplateRefRenderDirective
  ],
})
export class SmartRenderModule {

  constructor() { }

}
