import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeashboardComponent } from './deashboard.component';

describe('DeasshboardComponent', () => {
  let component: DeashboardComponent;
  let fixture: ComponentFixture<DeashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
