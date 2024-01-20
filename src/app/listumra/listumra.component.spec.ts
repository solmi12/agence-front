import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListumraComponent } from './listumra.component';

describe('ListumraComponent', () => {
  let component: ListumraComponent;
  let fixture: ComponentFixture<ListumraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListumraComponent]
    });
    fixture = TestBed.createComponent(ListumraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
