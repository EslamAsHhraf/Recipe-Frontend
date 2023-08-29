/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Register } from './register.component';

describe('RegisterComponent', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Register],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
