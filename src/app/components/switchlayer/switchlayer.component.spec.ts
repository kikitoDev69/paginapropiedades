import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchlayerComponent } from './switchlayer.component';

describe('SwitchlayerComponent', () => {
  let component: SwitchlayerComponent;
  let fixture: ComponentFixture<SwitchlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwitchlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
