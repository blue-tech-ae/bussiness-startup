import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MvpSuggestionComponent } from './mvp-suggestion.component';

describe('MvpSuggestionComponent', () => {
  let component: MvpSuggestionComponent;
  let fixture: ComponentFixture<MvpSuggestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MvpSuggestionComponent]
    });
    fixture = TestBed.createComponent(MvpSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
