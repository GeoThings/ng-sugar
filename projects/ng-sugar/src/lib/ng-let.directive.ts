import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

interface LetContext<T> {
    ngLet: T;
}

@Directive({
    selector: '[ngLet]'
})
export class NgLetDirective<T> {
    private letContext: LetContext<T> = { ngLet: null } as any;

    constructor(viewContainer: ViewContainerRef, templateRef: TemplateRef<LetContext<T>>) {
        viewContainer.createEmbeddedView(templateRef, this.letContext);
    }

    @Input()
    set ngLet(value: T) {
        this.letContext.ngLet = value;
    }
}
