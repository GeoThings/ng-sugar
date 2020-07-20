import { NgModule } from '@angular/core';
import {ObservableComponent} from './observable-component';
import { NgLetDirective } from './ng-let.directive';

@NgModule({
  declarations: [
    ObservableComponent,
    NgLetDirective
  ],
  imports: [],
  exports: [
    ObservableComponent,
    NgLetDirective
  ]
})
export class NgSugarModule {}
