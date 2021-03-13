import { Directive, Input, HostListener } from '@angular/core';

import { filterOp } from '../models/filterOp';
import { ApiService } from '../services/api.service';
@Directive({
  selector: '[sort]',
})
export class SortDirective {
  
  constructor(private ApiService:ApiService) {}
  @Input() sort: filterOp;
  dir: string = '';
  @HostListener('click')
  click() {
    console.log(this.sort)
    let dir = this.dir;
    dir = this.handleDirction(dir);
    this.ApiService.query.next({
      sortDir: dir,
      sortProp:dir? this.sort:filterOp.none,
      searchProp: null,
      searchVal: null,
    });
  }

  private handleDirction(dir: string) {
    switch (dir) {
      case '':
        dir = 'asc';
        break;
      case 'asc':
        dir = 'desc';
        break;
      case 'desc':
        dir = '';
        break;
      default:
        break;
    }
    return dir;
  }
}
