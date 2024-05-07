import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedInNavigationComponent } from './logged-in-navigation.component';

describe('LoggedInNavigationComponent', () => {
  let component: LoggedInNavigationComponent;
  let fixture: ComponentFixture<LoggedInNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggedInNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggedInNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
