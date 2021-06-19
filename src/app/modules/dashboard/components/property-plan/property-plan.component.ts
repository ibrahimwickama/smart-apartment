import { Component, OnInit, Input } from '@angular/core';
import { Floorplans } from '../../../../store/models';

@Component({
  selector: 'app-property-plan',
  templateUrl: './property-plan.component.html',
  styleUrls: ['./property-plan.component.css'],
})
export class PropertyPlanComponent implements OnInit {
  @Input() floorplans: Floorplans[];

  constructor() {}

  ngOnInit() {}

  trackByFn(index, item) {
    return item.id;
  }
}
