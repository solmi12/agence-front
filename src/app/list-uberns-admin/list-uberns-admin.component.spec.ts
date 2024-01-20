import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUbernsAdminComponent } from './list-uberns-admin.component';

describe('ListUbernsAdminComponent', () => {
  let component: ListUbernsAdminComponent;
  let fixture: ComponentFixture<ListUbernsAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListUbernsAdminComponent]
    });
    fixture = TestBed.createComponent(ListUbernsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
