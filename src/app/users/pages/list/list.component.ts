import { Component } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';

@Component({
  selector: 'app-list',
  imports: [TableComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {}
