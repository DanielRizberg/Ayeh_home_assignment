import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridModuleRoutingModule } from './grid-module-routing.module';
import { DataGridComponent } from './data-grid/data-grid.component';
import { SortDirective } from 'src/app/directive/sort.directive';


@NgModule({
  declarations: [DataGridComponent,SortDirective],
  imports: [
    CommonModule,
    GridModuleRoutingModule
  ],

})
export class GridModuleModule { }
