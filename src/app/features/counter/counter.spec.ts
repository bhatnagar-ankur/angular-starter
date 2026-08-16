import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Counter } from './counter';

function findButton(root: HTMLElement, label: string): HTMLButtonElement {
  const button = Array.from(root.querySelectorAll('button')).find(
    (candidate) => candidate.textContent?.trim() === label,
  );
  if (!button) {
    throw new Error(`No button found with label "${label}"`);
  }
  return button;
}

describe('Counter', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Counter],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('increments by the configured step size', async () => {
    const fixture = TestBed.createComponent(Counter);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;

    const stepInput = root.querySelector<HTMLInputElement>('input[type="number"]')!;
    stepInput.value = '5';
    stepInput.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    findButton(root, '+').click();
    await fixture.whenStable();

    expect(root.querySelector('.counter__count')?.textContent?.trim()).toBe('5');

    findButton(root, 'Reset').click();
    await fixture.whenStable();

    expect(root.querySelector('.counter__count')?.textContent?.trim()).toBe('0');
  });
});
