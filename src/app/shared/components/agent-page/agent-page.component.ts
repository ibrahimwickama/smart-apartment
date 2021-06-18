import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agent-page',
  templateUrl: './agent-page.component.html',
  styleUrls: ['./agent-page.component.css'],
})
export class AgentPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
}
