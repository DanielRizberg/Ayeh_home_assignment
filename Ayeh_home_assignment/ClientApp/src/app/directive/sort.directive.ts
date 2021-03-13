import { Directive, Input, HostListener } from '@angular/core';

import { filterOp } from '../models/filterOp';
import { ApiService } from '../services/api.service';
@Directive({
  selector: '[sort]',
})
export class SortDirective {
  
  constructor(private ApiService:ApiService) {}
  @Input() sort: filterOp;
  
  @HostListener('click')
  click() {
    this.ApiService.dir = this.handleDirction(this.ApiService.dir);
    this.ApiService.query.next({
      sortDir: this.ApiService.dir  ,
      sortProp:this.ApiService.dir ? this.sort:filterOp.none,
      searchProp: null,
      searchVal: null,
    });
  }

  private handleDirction(dir: string) {
   
    switch (dir) {
      case '':
        dir = 'asc';
        console.log('1')
        break;
      case 'asc':
        dir = 'desc';
        console.log('2')

        break;
      case 'desc':
        dir = '';
        console.log('3')

        break;
      default:
        dir = '';
        break;
    }
    

    return dir;
  }
}
