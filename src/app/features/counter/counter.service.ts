import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CounterService {
  private readonly count = signal(0);

  readonly value = this.count.asReadonly();
  readonly doubled = computed(() => this.count() * 2);

  increment(): void {
    this.count.update((current) => current + 1);
  }

  decrement(): void {
    this.count.update((current) => current - 1);
  }

  reset(): void {
    this.count.set(0);
  }
}
