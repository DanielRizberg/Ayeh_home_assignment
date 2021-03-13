import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comment-view',
  templateUrl: './comment-view.component.html',
  styleUrls: ['./comment-view.component.scss'],
})
export class CommentViewComponent implements OnInit, OnDestroy {
  constructor(private activatedRoute: ActivatedRoute) {}
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.subs = this.activatedRoute.params.subscribe((x) => {
      let post_id = x['post_id'];
      console.log(post_id);
    });
  }
  subs: Subscription;
}
