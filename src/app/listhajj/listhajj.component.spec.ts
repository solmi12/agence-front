import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListhajjComponent } from './listhajj.component';

describe('ListhajjComponent', () => {
  let component: ListhajjComponent;
  let fixture: ComponentFixture<ListhajjComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListhajjComponent]
    });
    fixture = TestBed.createComponent(ListhajjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
