import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CounterService } from './counter.service';

@Component({
  selector: 'app-counter',
  imports: [ReactiveFormsModule],
  templateUrl: './counter.html',
  styleUrl: './counter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Counter {
  private readonly counterService = inject(CounterService);

  protected readonly count = this.counterService.value;
  protected readonly doubled = this.counterService.doubled;

  protected readonly stepControl = new FormControl(1, { nonNullable: true });
  protected readonly step = toSignal(this.stepControl.valueChanges, {
    initialValue: this.stepControl.value,
  });

  protected increment(): void {
    for (let i = 0; i < this.step(); i++) {
      this.counterService.increment();
    }
  }

  protected decrement(): void {
    for (let i = 0; i < this.step(); i++) {
      this.counterService.decrement();
    }
  }

  protected reset(): void {
    this.counterService.reset();
  }
}
