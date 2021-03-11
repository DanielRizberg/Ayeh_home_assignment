import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridModuleRoutingModule } from './grid-module-routing.module';
import { DataGridComponent } from './data-grid/data-grid.component';


@NgModule({
  declarations: [DataGridComponent],
  imports: [
    CommonModule,
    GridModuleRoutingModule
  ]
})
export class GridModuleModule { }
