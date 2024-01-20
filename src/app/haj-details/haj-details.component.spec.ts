import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HajDetailsComponent } from './haj-details.component';

describe('HajDetailsComponent', () => {
  let component: HajDetailsComponent;
  let fixture: ComponentFixture<HajDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HajDetailsComponent]
    });
    fixture = TestBed.createComponent(HajDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
