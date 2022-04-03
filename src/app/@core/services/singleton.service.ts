import { Injectable } from '@angular/core';
import { SafeAny } from '@core/types';



export interface SingletonRecord {
  target: SafeAny;
}

export type SingletonRecords = Map<string, SingletonRecord>;


@Injectable({
  providedIn: 'root'
})
export class SingletonService {

  private readonly records: SingletonRecords = new Map();

  private get singleton(): SingletonRecords {
    return this.records;
  }

  public set<T = SafeAny>(key: string, target: T, force: boolean = false): void {
    if (!this.has(key) || force) {
      this.singleton.set(key, { target });
    }
  }

  public get<T = SafeAny>(key: string): T | null {
    return this.singleton.has(key)
      ? (this.singleton.get(key) as SafeAny).target as T
      : null;
  }

  public has(key: string): boolean {
    return this.singleton.has(key);
  }

  public clear(): void {
    this.records.clear();
  }

}
