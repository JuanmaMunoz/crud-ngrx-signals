import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfoCrudComponent } from './info-crud.component';

describe('InfoCrudComponent', () => {
  let component: InfoCrudComponent;
  let fixture: ComponentFixture<InfoCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoCrudComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should exist', () => {
    const compiled = fixture.nativeElement as HTMLEmbedElement;
    const h5 = compiled.querySelector('h5');
    const paragraphs = compiled.querySelectorAll('p');
    expect(h5?.textContent).toContain('Content:');
    expect(paragraphs[0].textContent).toContain('CRUD Application Example');
    expect(paragraphs[1].textContent).toContain('Angular 20: New Features');
    expect(paragraphs[2].textContent).toContain('NgRx 20: New Features');
    expect(paragraphs[3].textContent).toContain('State with Signals and NgRx');
    expect(paragraphs[4].textContent).toContain('Login, Tokens, Guards, and Interceptors');
    expect(paragraphs[5].textContent).toContain('Unit Testing with Jasmine, 99.5% coverage');
    expect(paragraphs[6].textContent).toContain('E2E Testing with Cypress');
  });
});
