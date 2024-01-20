import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HadschUmraComponent } from './hadsch-umra.component';

describe('HadschUmraComponent', () => {
  let component: HadschUmraComponent;
  let fixture: ComponentFixture<HadschUmraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HadschUmraComponent]
    });
    fixture = TestBed.createComponent(HadschUmraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
