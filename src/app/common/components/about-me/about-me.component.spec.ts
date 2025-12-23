import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutMeComponent } from './about-me.component';

describe('AboutMeComponent', () => {
  let component: AboutMeComponent;
  let fixture: ComponentFixture<AboutMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutMeComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should exist', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('a');
    expect(links.length).toBe(2);
    const h5 = compiled.querySelector('h5');
    expect(h5?.textContent).toContain('Juan Manuel Muñoz González');
    const paragraphs = compiled.querySelectorAll('p');
    expect(paragraphs[0]?.textContent).toContain('Front-End Architect');
    expect(paragraphs[1]).toBeTruthy();
    expect(paragraphs[2]).toBeTruthy();
  });
});
