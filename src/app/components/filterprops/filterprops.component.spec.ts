import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterpropsComponent } from './filterprops.component';

describe('FilterpropsComponent', () => {
  let component: FilterpropsComponent;
  let fixture: ComponentFixture<FilterpropsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterpropsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterpropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
