import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarShipItemComponent } from './star-ship-item.component';

describe('StarShipItemComponent', () => {
  let component: StarShipItemComponent;
  let fixture: ComponentFixture<StarShipItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarShipItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarShipItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
