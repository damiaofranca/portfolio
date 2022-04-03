import { Observable } from 'rxjs';
import { TemplateRef, Type } from '@angular/core';



export type SmartRenderType<Context = any> = string
 | Observable<string>
 | TemplateRef<Context>
 | Type<Context>
 | null
 | undefined;


export type SmartRenderComponentType<Context = any> = TemplateRef<Context> | Type<Context>;

export type StringTemplateRefRenderType<Context = any> = string
 | Type<Context>
 | TemplateRef<Context>
 | null
 | undefined;
