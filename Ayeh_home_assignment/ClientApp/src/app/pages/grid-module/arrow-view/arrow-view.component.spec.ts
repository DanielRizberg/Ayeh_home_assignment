import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowViewComponent } from './arrow-view.component';

describe('ArrowViewComponent', () => {
  let component: ArrowViewComponent;
  let fixture: ComponentFixture<ArrowViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrowViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrowViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
