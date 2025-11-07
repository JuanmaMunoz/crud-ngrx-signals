import { ComponentFixture, TestBed } from '@angular/core/testing';

import { signal } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Color } from '../../models/enums';
import { IBoxInfo } from '../../models/interfaces';
import { BoxInfoComponent } from './box-info.component';

fdescribe('BoxInfoComponent', () => {
  let component: BoxInfoComponent;
  let fixture: ComponentFixture<BoxInfoComponent>;

  const boxInfo: IBoxInfo = {
    label: 'Salary',
    value: 50000,
    color: Color.PRIMARY,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxInfoComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BoxInfoComponent);
    component = fixture.componentInstance;
    component.boxInfo = signal(boxInfo);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should exist', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const borderColor = compiled.querySelector(`.border-${boxInfo.color}`);
    const textColor = compiled.querySelector(`.text-${boxInfo.color}`);
    const h5 = compiled.querySelector('h5');
    const h4 = compiled.querySelector('h4');

    expect(borderColor).toBeTruthy();
    expect(textColor).toBeTruthy();
    expect(h5?.textContent).toContain(boxInfo.label);
    expect(h4?.textContent).toContain(boxInfo.value);
  });
});
