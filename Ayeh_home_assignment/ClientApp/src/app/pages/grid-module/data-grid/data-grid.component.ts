import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  ElementRef,
  AfterViewChecked,
  ChangeDetectorRef,
} from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { post } from 'src/app/models/post';
import { filterOp } from 'src/app/models/filterOp';
import { Subscription, fromEvent } from 'rxjs';
import { filter, debounceTime } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';
import { queryDto } from 'src/app/models/querydto';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
})
export class DataGridComponent
  implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {
  constructor(private apiService: ApiService, private cd: ChangeDetectorRef) {}
  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }
  private handleTypeEvent() {
    setTimeout;
    this.subs = fromEvent(this.searchText.nativeElement, 'input')
      .pipe(
        filter((x) => (x as any).target.value.length >= 3),
        debounceTime(5000)
      )
      .subscribe((x) => {
        let value = (x as any).target.value;
        if (value) {
          this.query.searchVal = value;
          let request = {
            sortDir: this.query.sortDir,
            searchProp: filterOp.authorAndTitle,
            searchVal: value,
            sortProp: this.query.sortProp,
          };
          this.getDataFromApi(request);
        } else {
          this.loadData();
        }
      });
  }

  ngAfterViewInit(): void {
    this.handleTypeEvent();
    this.handleSortEvent();
  }
  private handleSortEvent() {
    this.subs.add(
      this.apiService.query.subscribe((x) => {
        this.query.sortDir = x.sortDir;
        this.query.sortProp = x.sortProp;
        this.getDataFromApi(this.query);
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  subs: Subscription;
  loading: boolean = false;
  query: queryDto = {
    searchProp: filterOp.authorAndTitle,
    searchVal: '',
    sortProp: filterOp.none,
    sortDir: 'asc',
  };
  @ViewChild('searchText') searchText: ElementRef;
  data: post[];
  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.loading = true;
    let request = this.getAllDataRequest();
    this.getDataFromApi(request);
  }

  private getAllDataRequest() {
    return {
      searchProp: filterOp.none,
      searchVal: '',
      sortProp: filterOp.none,
      sortDir: 'asc',
    };
  }

  private getDataFromApi(request: {
    sortDir: string;
    searchProp: filterOp;
    searchVal: string;
    sortProp: filterOp;
  }) {
    this.loading = true;
    this.apiService.getData(request).subscribe((x) => {
      this.data = x.posts;
      this.loading = false;
    });
  }

  getRandomImage() {
    let value= `https://picsum.photos/150/150/?random&t=${new Date().getTime()}`;
  
    return value;
  }

  public get filterOp(): typeof filterOp {
    return filterOp;
  }

  deletePost(item: post) {
    this.loading = true;
    this.apiService.deletePost(item).subscribe((x) => {
      if (x) {
        this.getDataFromApi(this.query);
      }
      this.loading = false;
    });
  }
  markPost(item: post) {
    this.loading = true;
    this.apiService.mark(item).subscribe((x) => {
      if (x) {
        this.getDataFromApi(this.query);
      }
      this.loading = false;
    });
  }
  reset() {
    this.loading = true;
    this.apiService.reset().subscribe((x) => {
      this.data = x.posts;
      this.loading = false;
    });
  }
}
