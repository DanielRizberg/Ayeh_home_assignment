import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { GridModuleRoutingModule } from './grid-module-routing.module';
import { DataGridComponent } from './data-grid/data-grid.component';
import { SortDirective } from 'src/app/directive/sort.directive';
import { CommentViewComponent } from './comment-view/comment-view.component';
import { ArrowViewComponent } from './arrow-view/arrow-view.component';


@NgModule({
  declarations: [DataGridComponent,SortDirective, CommentViewComponent, ArrowViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    GridModuleRoutingModule
  ],
providers:[]
})
export class GridModuleModule { }
