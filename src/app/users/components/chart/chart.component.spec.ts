import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart.component';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;
  const mockChart = {
    destroy: jasmine.createSpy('destroy'),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    component.idChart = 'x';
    component.chart = mockChart as any;
    component.chartLine = mockChart as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*it('should to load the chart', () => {
    component.dataSets = [
      {
        label: 'test demo',
        data: [10, 11, 12, 13, 14, 15, 16],
        backgroundColor: ['rgb(20,40,40)'],
      },
    ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const canvas = compiled.querySelector('canvas');
    expect(component.chartData).not.toBeNull();
    expect(canvas).toBeTruthy();
  });*/

  it('should to call destroy if the chart exist', () => {
    fixture.detectChanges();
    expect(mockChart.destroy).toHaveBeenCalled();
  });
});
