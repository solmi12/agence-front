import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListotherComponent } from './listother.component';

describe('ListotherComponent', () => {
  let component: ListotherComponent;
  let fixture: ComponentFixture<ListotherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListotherComponent]
    });
    fixture = TestBed.createComponent(ListotherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
