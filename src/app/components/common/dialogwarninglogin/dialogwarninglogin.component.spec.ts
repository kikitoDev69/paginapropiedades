import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogwarningloginComponent } from './dialogwarninglogin.component';

describe('DialogwarningloginComponent', () => {
  let component: DialogwarningloginComponent;
  let fixture: ComponentFixture<DialogwarningloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogwarningloginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogwarningloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
