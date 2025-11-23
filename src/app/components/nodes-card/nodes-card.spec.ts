import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodesCard } from './nodes-card';

describe('NodesCard', () => {
  let component: NodesCard;
  let fixture: ComponentFixture<NodesCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NodesCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NodesCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
