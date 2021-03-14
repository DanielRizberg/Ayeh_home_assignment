import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-comment-view',
  templateUrl: './comment-view.component.html',
  styleUrls: ['./comment-view.component.scss'],
})
export class CommentViewComponent implements OnInit, OnDestroy {
  constructor(private activatedRoute: ActivatedRoute,private apiService:ApiService) {}
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
postId:number;
  ngOnInit(): void {
    this.subs = this.activatedRoute.params.subscribe((x) => {
      let post_id = x['post_id'];
     this.postId=post_id;
     this.apiService.getCommentsById(post_id).subscribe(x=>{});
    });
  }
  subs: Subscription;
}
