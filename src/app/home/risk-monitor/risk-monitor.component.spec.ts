import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskMonitorComponent } from './risk-monitor.component';

describe('RiskMonitorComponent', () => {
  let component: RiskMonitorComponent;
  let fixture: ComponentFixture<RiskMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskMonitorComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
