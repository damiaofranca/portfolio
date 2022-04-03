import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';

import { ResizeService } from './resize.service';
import { BreakpointBooleanMap, BreakpointEnum, BreakpointMap, gridResponsiveMap } from './utils';




@Injectable({
  providedIn: 'root'
})
export class BreakpointsService {

  constructor(private readonly service: ResizeService) {
    this.service.subscribe().subscribe(() => { });
  }

  public subscribe(breakpointMap: BreakpointMap): Observable<BreakpointEnum>;
  public subscribe(breakpointMap: BreakpointMap, fullMap: true): Observable<BreakpointBooleanMap>;
  public subscribe(breakpointMap: BreakpointMap, fullMap?: true): Observable<BreakpointEnum | BreakpointBooleanMap> {
    if (fullMap) {
      const get = () => this.matchMedia(breakpointMap, true);
      return this.service.subscribe().pipe(
        map(get),
        startWith(get()),
        distinctUntilChanged((x: [BreakpointEnum, BreakpointBooleanMap], y: [BreakpointEnum, BreakpointBooleanMap]) => x[0] === y[0]),
        map(x => x[1])
      );
    } else {
      const get = () => this.matchMedia(breakpointMap);
      return this.service.subscribe().pipe(map(get), startWith(get()), distinctUntilChanged());
    }
  }

  private matchMedia(breakpointMap: BreakpointMap): BreakpointEnum;
  private matchMedia(breakpointMap: BreakpointMap, fullMap: true): [BreakpointEnum, BreakpointBooleanMap];
  private matchMedia(breakpointMap: BreakpointMap, fullMap?: true): BreakpointEnum | [BreakpointEnum, BreakpointBooleanMap] {
    let bp = BreakpointEnum.md;

    const breakpointBooleanMap: Partial<BreakpointBooleanMap> = {};

    if (fullMap) {
      return [bp, breakpointBooleanMap as BreakpointBooleanMap];
    } else {
      return bp;
    }
  }

}
