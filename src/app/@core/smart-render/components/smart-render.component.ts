// tslint:disable: variable-name
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SafeAny } from '../../types';
import { Observable } from 'rxjs';
import { Context } from '../utils/context';
import { SmartRenderType } from '../utils/types';



@Component({
  selector: '[appSmartRender], app-smart-render',
  template: `
    <ng-container *appStringTemplateRefRender="$any(smartRender); context: smartRenderContext">
      <span [innerText]="isAObservable ? ( $any(smartRender) | async ) : smartRender"></span>
    </ng-container>
  `,
  exportAs: 'smartRenderRef',
  preserveWhitespaces: false,
  host: {
    '[class.app-smart-render]': `true`,
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartRenderComponent<_T = unknown> {

  @Input()
  public smartRenderContext: SafeAny = null;

  @Input()
  public smartRender: SmartRenderType = null;

  public get isAObservable(): boolean {
    return this.smartRender instanceof Observable;
  }

  /**
   * Ivy render complement
   */
  public static ngTemplateContextGuard<T>(_dir: SmartRenderComponent<T>, ctx: SafeAny): ctx is Context {
    return true;
  }

  constructor() { }

}
