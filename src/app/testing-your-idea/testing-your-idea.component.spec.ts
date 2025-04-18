import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingYourIdeaComponent } from './testing-your-idea.component';

describe('TestingYourIdeaComponent', () => {
  let component: TestingYourIdeaComponent;
  let fixture: ComponentFixture<TestingYourIdeaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestingYourIdeaComponent]
    });
    fixture = TestBed.createComponent(TestingYourIdeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
