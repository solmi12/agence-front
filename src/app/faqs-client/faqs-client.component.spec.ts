import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqsClientComponent } from './faqs-client.component';

describe('FaqsClientComponent', () => {
  let component: FaqsClientComponent;
  let fixture: ComponentFixture<FaqsClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FaqsClientComponent]
    });
    fixture = TestBed.createComponent(FaqsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
