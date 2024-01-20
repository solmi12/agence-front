import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHajjAdminComponent } from './list-hajj-admin.component';

describe('ListHajjAdminComponent', () => {
  let component: ListHajjAdminComponent;
  let fixture: ComponentFixture<ListHajjAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListHajjAdminComponent]
    });
    fixture = TestBed.createComponent(ListHajjAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
