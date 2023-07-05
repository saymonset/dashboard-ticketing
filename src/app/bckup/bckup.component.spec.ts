import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BckupComponent } from './bckup.component';

describe('BckupComponent', () => {
  let component: BckupComponent;
  let fixture: ComponentFixture<BckupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BckupComponent]
    });
    fixture = TestBed.createComponent(BckupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
