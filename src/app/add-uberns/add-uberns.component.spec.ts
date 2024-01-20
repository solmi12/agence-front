import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUbernsComponent } from './add-uberns.component';

describe('AddUbernsComponent', () => {
  let component: AddUbernsComponent;
  let fixture: ComponentFixture<AddUbernsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUbernsComponent]
    });
    fixture = TestBed.createComponent(AddUbernsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
