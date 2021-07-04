import { Component, OnInit, Input } from '@angular/core';
import { PropertyInfo } from '../../../../store/models/page-state.model';

@Component({
  selector: 'app-property-overview',
  templateUrl: './property-overview.component.html',
  styleUrls: ['./property-overview.component.css'],
})
export class PropertyOverviewComponent implements OnInit {
  @Input() property: PropertyInfo;

  constructor() {}

  ngOnInit() {}
}
