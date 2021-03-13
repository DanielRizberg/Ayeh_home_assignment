import { Component, OnInit, Input } from '@angular/core';
import { queryDto } from 'src/app/models/querydto';

@Component({
  selector: 'app-arrow-view',
  templateUrl: './arrow-view.component.html',
  styleUrls: ['./arrow-view.component.scss']
})
export class ArrowViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
@Input() query:queryDto;
}
