## ng-sugar
Syntactic sugar utils for Angular.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.3 (boilerplate is frightening though).

## Installation

```bash
npm install --save ng-sugar
```

or

```bash
yarn add ng-sugar
```

## Purpose

Reduce the boilerplate in rxjs-first workflows. Angular itself is not centered around rxjs yet it uses it to a degree, where at times logic starts looking convoluted and a bit boilerplaty when we start mixing observables with component lifecycle, Inputs, ViewChild, etc.

For example, let's say we want to make a component that can define its own navigation items and pass it back to parent component that manages the appshell's navigation bar. One way would be to write:

```ts
@Component({
    selector: 'hero-component',
    template: `
        <p>Hero Component</p>

        <ng-template #items>
            <button mat-icon-button>
                <mat-icon>arrow_drop_up</mat-icon>
            </button>
        </ng-template>
    `
})
export class HeroComponent {
    @ViewChild("items", {static: false}) items: TemplateRef<any>
    @Output() appbarItems = new EventEmitter<TemplateRef<any>>()

    ngAfterViewInit(): void { 
        this.appbarItems.emit(this.items)
    }
}
```

Doing this is totally fine as long as there no code that will run prior to `ngAfterViewInit()`  that touches `this.items` which are undefined in that case.

As an alternative, we can utilize `ObservableComponent` that has lifecycle hooks as observables, then expessing our logic on top of this observable. Above will now look like:

```ts
import {ObservableComponent} from "ng-sugar";

//...
export class HeroComponent extends ObservableComponent {
    @ViewChild("items", {static: false}) items: TemplateRef<any>
    // emits once on afterViewInit
    items$ = this.afterViewInit.pipe(map(() => this.items))

    @Output() appbarItems = new EventEmitter<TemplateRef<any>>()

    constructor(){
        super()

        this.items$.subscribe(
            items => this.appbarItems.emit(items),
            console.error)
    }
}
```

## About

This is a small set of utils that might be part of Angular core itself one day. It consists of 

* ObservableComponent
* ngLet directive
* ObservableInput reimported from [insidewhy/observable-input](https://github.com/insidewhy/observable-input)

## ObservableComponent

Inheriting from `ObservableComponent` adds an observable counterpart to every lifecycle hook (with ng prefix removed).
ngAfterViewInit in the below example is available as `this.afterViewInit`:

```ts
import {ObservableComponent} from "ng-sugar";

//...
export class HeroComponent extends ObservableComponent {
    @ViewChild("items", {static: false}) items: TemplateRef<any>
    // emits once on afterViewInit
    items$ = this.afterViewInit.pipe(map(() => this.items))
}
```

## NgLet

We can unwrap an observable inside a template using *ngIf directive utilizing `as` binding, like:

```html
<ng-container *ngIf="groupId$ | async as groupId">
</ng-container>
```

Before groupId$ emits or if it is null, above `ng-container` won't be rendered to the DOM. When it is not desired, replacing the above with `*ngLet` handles this usecase:

```html
<ng-container *ngLet="groupId$ | async as groupId">
</ng-container>
```

## ObservableInput
See [insidewhy/observable-input](https://github.com/insidewhy/observable-input)

## Contributing

Check [CONTIBUTING.md](CONTRIBUTING.md)
