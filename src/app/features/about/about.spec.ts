import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { About } from './about';

describe('About', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [About],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(About);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
