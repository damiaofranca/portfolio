// tslint:disable: variable-name
import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  EmbeddedViewRef,
  SimpleChange,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  Type
} from '@angular/core';
import { SafeAny } from '@core/types';

import { Context } from '../utils/context';
import { SmartRenderType, StringTemplateRefRenderType } from '../utils/types';



@Directive({
  selector: '[appStringTemplateRefRender]',
  exportAs: 'stringTemplateRefRenderRef'
})
export class StringTemplateRefRenderDirective<_T = unknown> implements OnChanges {

  private embeddedViewRef: EmbeddedViewRef<SafeAny> | null = null;

  private context = new Context();

  private componentRef!: ComponentRef<Type<SafeAny>>;

  @Input('appStringTemplateRefRenderContext')
  public stringTemplateRefRenderContext: SafeAny | null = null;

  @Input('appStringTemplateRefRender')
  public stringTemplateRefRender: StringTemplateRefRenderType & SmartRenderType = null;

  /*
    Ivy render complement
   */
  public static ngTemplateContextGuard<T>(_dir: StringTemplateRefRenderDirective<T>, _ctx: SafeAny): _ctx is Context {
    return true;
  }

  constructor(private viewContainer: ViewContainerRef, private templateRef: TemplateRef<SafeAny>, private cfr: ComponentFactoryResolver) {
  }

  private recreateView(): void {
    this.viewContainer.clear();
    const isTemplateRef = this.stringTemplateRefRender instanceof TemplateRef;
    const isComponent = this.stringTemplateRefRender instanceof Type;
    if (!isComponent) {
      const templateRef = (isTemplateRef ? this.stringTemplateRefRender : this.templateRef) as SafeAny;
      this.embeddedViewRef = this.viewContainer.createEmbeddedView(
        templateRef,
        isTemplateRef ? this.stringTemplateRefRenderContext : this.context
      );
    } else {
      try {
        // tslint:disable-next-line: max-line-length
        const ref: ComponentRef<Type<SafeAny>> = this.viewContainer.createComponent(this.cfr.resolveComponentFactory(this.stringTemplateRefRender as SafeAny));
        const ctx = isComponent ? this.stringTemplateRefRenderContext : this.context;
        if (ctx) {
          for (const prop in ctx) {
            if (ctx.hasOwnProperty(prop)) {
              (ref.instance as Partial<SafeAny>)[prop] = (ctx as Partial<SafeAny>)[prop];
            }
          }
        }
        ref.changeDetectorRef.markForCheck();
        ref.changeDetectorRef.detectChanges();
        this.componentRef = ref;
      } catch (e) {
        const templateRef = (isTemplateRef ? this.stringTemplateRefRender : this.templateRef) as SafeAny;
        this.embeddedViewRef = this.viewContainer.createEmbeddedView(
          templateRef,
          isTemplateRef ? this.stringTemplateRefRenderContext : this.context
        );
      }
    }
  }

  private updateContext(): void {
    const isTemplateRef = this.stringTemplateRefRender instanceof TemplateRef;
    const isComponent = this.stringTemplateRefRender instanceof Type;
    if (!isComponent) {
      const newCtx = isTemplateRef ? this.stringTemplateRefRenderContext : this.context;
      const oldCtx = this.embeddedViewRef!.context as SafeAny;
      if (newCtx) {
        for (const propName of Object.keys(newCtx)) {
          oldCtx[propName] = newCtx[propName];
        }
      }
    } else {
      const newCtx = isComponent ? this.stringTemplateRefRenderContext : this.context;
      const oldCtx = this.componentRef.instance as SafeAny;
      if (newCtx) {
        for (const propName of Object.keys(newCtx)) {
          oldCtx[propName] = newCtx[propName];
        }
      }
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { stringTemplateRefRenderContext, stringTemplateRefRender } = changes;
    const shouldRecreateView = (): boolean => {
      let shouldOutletRecreate = false;
      if (stringTemplateRefRender) {
        if (stringTemplateRefRender.firstChange) {
          shouldOutletRecreate = true;
        } else {
          const isPreviousOutletTemplate = stringTemplateRefRender.previousValue instanceof TemplateRef;
          const isCurrentOutletTemplate = stringTemplateRefRender.currentValue instanceof TemplateRef;
          const isPreviousOutletComponent = stringTemplateRefRender.previousValue instanceof Type;
          const isCurrentOutletComponent = stringTemplateRefRender.currentValue instanceof Type;
          shouldOutletRecreate = isPreviousOutletTemplate
            || isCurrentOutletTemplate
            || isPreviousOutletComponent
            || isCurrentOutletComponent;
        }
      }
      const hasContextShapeChanged = (ctxChange: SimpleChange): boolean => {
        const prevCtxKeys = Object.keys(ctxChange.previousValue || {});
        const currCtxKeys = Object.keys(ctxChange.currentValue || {});
        if (prevCtxKeys.length === currCtxKeys.length) {
          for (const propName of currCtxKeys) {
            if (prevCtxKeys.indexOf(propName) === -1) {
              return true;
            }
          }
          return false;
        } else {
          return true;
        }
      };
      const shouldContextRecreate = stringTemplateRefRenderContext && hasContextShapeChanged(stringTemplateRefRenderContext);
      return shouldContextRecreate || shouldOutletRecreate;
    };

    if (stringTemplateRefRender) {
      this.context.$implicit = stringTemplateRefRender.currentValue;
    }

    const recreateView = shouldRecreateView();
    if (recreateView) {
      this.recreateView();
    } else {
      this.updateContext();
    }
  }

}
