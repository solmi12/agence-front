import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UmraComponent } from './umra.component';

describe('UmraComponent', () => {
  let component: UmraComponent;
  let fixture: ComponentFixture<UmraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UmraComponent]
    });
    fixture = TestBed.createComponent(UmraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
