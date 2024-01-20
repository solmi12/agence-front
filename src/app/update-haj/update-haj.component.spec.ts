import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHajComponent } from './UpdateHajComponent';

describe('UpdateHajComponent', () => {
  let component: UpdateHajComponent;
  let fixture: ComponentFixture<UpdateHajComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateHajComponent]
    });
    fixture = TestBed.createComponent(UpdateHajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
