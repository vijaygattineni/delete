import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicProfilePage } from './dynamic-profile.page';

describe('DynamicProfilePage', () => {
  let component: DynamicProfilePage;
  let fixture: ComponentFixture<DynamicProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
