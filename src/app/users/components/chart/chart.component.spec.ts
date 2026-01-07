import { ComponentFixture, TestBed } from '@angular/core/testing';

import { signal } from '@angular/core';
import { statistics } from '../../../../assets/data/statistics';
import { users } from '../../../../assets/data/users';
import { IUserDetail } from '../../models/interfaces';
import { ChartComponent } from './chart.component';
import { Chart } from 'chart.js';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;
  const userDetail: IUserDetail = {
    info: users[0],
    statistics: statistics[0],
  };
  const mockChart = {
    destroy: jasmine.createSpy('destroy')
  } as unknown as Chart;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    component.idChart = 'x';
    component.chart = mockChart;
    component.chartLine = mockChart;
    component.userDetail = signal(userDetail);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should exist canvas', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const canvas = compiled.querySelector('canvas');
    expect(canvas).toBeTruthy();
  });
});
