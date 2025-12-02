import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogoComponent } from './logo.component';

fdescribe('LogoComponent', () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should exist', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const h1 = compiled.querySelector('h1');
    const h3 = compiled.querySelector('h3');
    const images = compiled.querySelectorAll('img');
    const spans = compiled.querySelectorAll('span');
    expect(h1?.textContent).toContain('CRUD');
    expect(h3?.textContent).toContain('+');
    expect(images.length).toBe(2);
    expect(spans[0].textContent).toContain('with');
    expect(spans[1].textContent).toContain('Signals');
  });
});
