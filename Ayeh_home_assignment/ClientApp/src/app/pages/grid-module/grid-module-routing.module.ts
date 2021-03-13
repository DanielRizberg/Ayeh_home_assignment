import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataGridComponent } from './data-grid/data-grid.component';
import { CommentViewComponent } from './comment-view/comment-view.component';

const routes: Routes = [
  { path: 'posts', component: DataGridComponent },
  {path:'comment/:post_id',component:CommentViewComponent},
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GridModuleRoutingModule {}
