import { AfterViewInit, Component, effect, Input, Signal, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ICharData, IUserDetail } from '../../models/interfaces';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent implements AfterViewInit {
  @Input() idChart = '';
  @Input() userDetail!: Signal<IUserDetail | null>;
  @ViewChild('canvas') canvas!: HTMLCanvasElement;
  @ViewChild('canvasLine') canvasLine!: HTMLCanvasElement;
  public chart: Chart | null = null;
  public chartLine: Chart | null = null;
  public chartData!: ICharData;

  constructor() {
    effect(() => {
      if (this.userDetail()) {
        this.chartData = {
          labels: ['Coworker', 'Hard Working', 'Knowledge', 'Proactivity', 'Productivity'],
          datasets: [
            {
              label: 'User´s Statistics',
              data: [
                this.userDetail()!.statistics.coworker!,
                this.userDetail()!.statistics.hardworking!,
                this.userDetail()!.statistics.knowledge!,
                this.userDetail()!.statistics.proactivity!,
                this.userDetail()!.statistics.productivity!,
              ],
              backgroundColor: [
                'rgb(153, 230, 255)',
                'rgb(0, 122, 204)',
                'rgb(8, 135, 93)',
                'rgb(255, 192, 8)',
                'rgb(255, 76, 76)',
              ],
            },
          ],
        };
      }
    });
  }

  ngAfterViewInit(): void {
    this.createChart();
    this.createChartLine();
  }

  private createChart() {
    if (this.chart) this.chart.destroy();
    const ctx = document.getElementById(this.idChart);

    this.chart = new Chart(ctx as HTMLCanvasElement, {
      type: 'polarArea',
      data: this.chartData,
      options: {
        layout: {
          padding: 0,
        },
        scales: {
          r: {
            grid: {
              color: 'rgb(62, 62, 66)',
              lineWidth: 1,
            },
            ticks: {
              color: 'rgb(173, 181, 189)',
              backdropColor: 'transparent',
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              font: {
                size: 18,
              },
              padding: 20,
              color: 'rgb(173, 181, 189)',
            },
          },
        },
      },
    });
  }

  private createChartLine(): void {
    if (this.chartLine) this.chart?.destroy();
    const ctx = document.getElementById(this.idChart + 'line');
    this.chartLine = new Chart(ctx as HTMLCanvasElement, {
      type: 'line',
      data: this.chartData,
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              color: 'rgb(62, 62, 66)',
            },
          },
          y: {
            grid: {
              color: 'rgb(62, 62, 66)',
            },
          },
        },
        elements: {
          line: {
            borderColor: 'rgb(173, 181, 189)',
            borderWidth: 2,
          },
          point: {
            backgroundColor: 'rgb(173, 181, 189)',
            radius: 4,
          },
        },
      },
    });
  }
}
