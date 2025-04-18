import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketResearchComponent } from './market-research.component';

describe('MarketResearchComponent', () => {
  let component: MarketResearchComponent;
  let fixture: ComponentFixture<MarketResearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarketResearchComponent]
    });
    fixture = TestBed.createComponent(MarketResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
