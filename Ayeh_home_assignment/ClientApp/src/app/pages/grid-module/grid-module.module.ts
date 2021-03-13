import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridModuleRoutingModule } from './grid-module-routing.module';
import { DataGridComponent } from './data-grid/data-grid.component';
import { SortDirective } from 'src/app/directive/sort.directive';
import { CommentViewComponent } from './comment-view/comment-view.component';


@NgModule({
  declarations: [DataGridComponent,SortDirective, CommentViewComponent],
  imports: [
    CommonModule,
    GridModuleRoutingModule
  ],
providers:[]
})
export class GridModuleModule { }
