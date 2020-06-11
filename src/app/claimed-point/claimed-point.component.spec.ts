import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimedPointComponent } from './claimed-point.component';

describe('ClaimedPointComponent', () => {
  let component: ClaimedPointComponent;
  let fixture: ComponentFixture<ClaimedPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimedPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimedPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
