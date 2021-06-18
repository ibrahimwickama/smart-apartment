import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { sharedComponents } from './components';
import { services } from './services';
import { materialModules } from './material-modules';
import { HttpClientModule } from '@angular/common/http';
import { sharedPipes } from './pipes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ...materialModules,
  ],
  declarations: [...sharedComponents, ...sharedPipes],
  exports: [...sharedComponents, ...materialModules, ...sharedPipes],
  providers: [...services],
})
export class SharedModule {}
