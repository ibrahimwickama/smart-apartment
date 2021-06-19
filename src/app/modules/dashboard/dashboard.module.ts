import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dashboardComponents } from './components';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { dashboardPagesComponents } from './pages';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DashboardRoutingModule,
    SharedModule,
  ],
  declarations: [...dashboardPagesComponents, ...dashboardComponents],
})
export class DashboardModule {}
