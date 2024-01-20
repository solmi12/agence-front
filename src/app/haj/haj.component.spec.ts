import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HajComponent } from './haj.component';

describe('HajComponent', () => {
  let component: HajComponent;
  let fixture: ComponentFixture<HajComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HajComponent]
    });
    fixture = TestBed.createComponent(HajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
