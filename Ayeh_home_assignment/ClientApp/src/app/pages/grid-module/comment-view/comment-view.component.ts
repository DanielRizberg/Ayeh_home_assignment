import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { post } from 'src/app/models/post';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-comment-view',
  templateUrl: './comment-view.component.html',
  styleUrls: ['./comment-view.component.scss'],
})
export class CommentViewComponent implements OnInit, OnDestroy {
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {}
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  post: post;
  loading: boolean = false;
  ngOnInit(): void {
    this.subs = this.activatedRoute.params.subscribe((x) => {
      let post_id = x['post_id'];

      this.getData(post_id);
    });
  }
  subs: Subscription;

  private getData(post_id: any) {
    this.loading = true;
    this.apiService.getPostById(post_id).subscribe((x) => {
      this.post = x;
      this.loading = false;
    });
  }
}
