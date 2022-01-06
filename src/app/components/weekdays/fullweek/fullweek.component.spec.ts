import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullweekComponent } from './fullweek.component';

describe('FullweekComponent', () => {
  let component: FullweekComponent;
  let fixture: ComponentFixture<FullweekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullweekComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullweekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
