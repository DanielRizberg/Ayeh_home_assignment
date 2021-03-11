import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { post } from 'src/app/models/post';
import { filterOp } from 'src/app/models/filterOp';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
})
export class DataGridComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  data: post[];
  ngOnInit(): void {
    let request = {
      sortDir: 'asc',
      searchProp: filterOp.none,
      searchVal: '',
      sortProp: filterOp.none,
    };
    this.apiService.getData(request).subscribe((x) => (this.data = x.posts));
  }
}
