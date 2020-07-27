import { NgModule } from '@angular/core';
import { SampleComponent } from "../components/sample/sample.component";
import { TandCComponent } from "../components/tand-c/tand-c.component";

@NgModule({
    declarations:[SampleComponent, TandCComponent],
    exports:[SampleComponent, TandCComponent],
    entryComponents: [TandCComponent]
})

export class ComponentsModule{}