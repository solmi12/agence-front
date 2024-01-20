import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreislisteComponent } from './preisliste.component';

describe('PreislisteComponent', () => {
  let component: PreislisteComponent;
  let fixture: ComponentFixture<PreislisteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreislisteComponent]
    });
    fixture = TestBed.createComponent(PreislisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
