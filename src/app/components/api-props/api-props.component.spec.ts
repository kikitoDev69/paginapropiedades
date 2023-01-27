import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiPropsComponent } from './api-props.component';

describe('ApiPropsComponent', () => {
  let component: ApiPropsComponent;
  let fixture: ComponentFixture<ApiPropsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiPropsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiPropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
