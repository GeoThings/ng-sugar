import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ObservableComponent } from './observable-component';
import {Component} from '@angular/core';

@Component({
    selector: 'lib-observable-test-component',
    template: ``,
    styles: [``]
})
export class ObservableTestComponent extends ObservableComponent {}

describe('ObservableComponent', () => {
  let component: ObservableComponent;
  let fixture: ComponentFixture<ObservableTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservableTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservableTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
