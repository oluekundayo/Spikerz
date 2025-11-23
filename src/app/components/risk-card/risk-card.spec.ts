import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskCard } from './risk-card';

describe('RiskCard', () => {
  let component: RiskCard;
  let fixture: ComponentFixture<RiskCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiskCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
