import { ComponentFixture, TestBed } from '@angular/core/testing';

import { signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  const search: WritableSignal<string> = signal('');
  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [SearchComponent],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    component.search = search;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set searchText empty when deleteSearch is called', () => {
    component.deleteSearch();
    expect(component.searchText()).toBe('');
  });

  it('should navigate to /users/create when createUser is called', () => {
    component.createUser();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/users/create']);
  });

  it('should exist input and buttons in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('input');
    const buttons = compiled.querySelectorAll('button');
    expect(input).toBeTruthy();
    expect(buttons.length).toBe(2);
  });
});
