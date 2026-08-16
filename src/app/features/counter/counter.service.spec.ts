import { TestBed } from '@angular/core/testing';
import { CounterService } from './counter.service';

describe('CounterService', () => {
  let service: CounterService;

  beforeEach(() => {
    service = TestBed.inject(CounterService);
  });

  it('starts at zero', () => {
    expect(service.value()).toBe(0);
    expect(service.doubled()).toBe(0);
  });

  it('increments and decrements', () => {
    service.increment();
    service.increment();
    expect(service.value()).toBe(2);
    expect(service.doubled()).toBe(4);

    service.decrement();
    expect(service.value()).toBe(1);
  });

  it('resets to zero', () => {
    service.increment();
    service.reset();
    expect(service.value()).toBe(0);
  });
});
