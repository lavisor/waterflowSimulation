import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorBoardComponent } from './simulator-board.component';

describe('SimulatorBoardComponent', () => {
  let component: SimulatorBoardComponent;
  let fixture: ComponentFixture<SimulatorBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulatorBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulatorBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
