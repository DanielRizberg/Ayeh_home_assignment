import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { post } from 'src/app/models/post';
import { filterOp } from 'src/app/models/filterOp';
import { Subscription, fromEvent } from 'rxjs';
import { filter, debounceTime } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
})
export class DataGridComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(private apiService: ApiService) {}
  ngAfterViewInit(): void {
    this.subs = fromEvent(this.searchText, 'input')
      .pipe(
        filter((x) => (x.target as any).value.length >= 3),
        debounceTime(5000)
      )
      .subscribe((x) => {
        let value = (x.target as any).value;
        if (value) {
          let request = {
            sortDir: 'asc',
            searchProp: filterOp.authorAndTitle,
            searchVal: value,
            sortProp: filterOp.none,
          };
          this.getDataFromApi(request);
        } else {
          this.loadData();
        }
      });
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  subs: Subscription;
  @ViewChild('searchText') searchText: HTMLInputElement;
  data: post[];
  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    let request = this.getAllDataRequest();
    this.getDataFromApi(request);
  }

  private getAllDataRequest() {
    return {
      sortDir: 'asc',
      searchProp: filterOp.none,
      searchVal: '',
      sortProp: filterOp.none,
    };
  }

  private getDataFromApi(request: {
    sortDir: string;
    searchProp: filterOp;
    searchVal: string;
    sortProp: filterOp;
  }) {
    this.apiService.getData(request).subscribe((x) => (this.data = x.posts));
  }

  getRandomImage() {
    return `https://picsum.photos/150/150/?random&t=${new Date().getTime()}`;
  }
}
