import { NgModule } from '@angular/core';
import { SampleComponent } from "../components/sample/sample.component";
import { TandCComponent } from "../components/tand-c/tand-c.component";

import { DropDownCapsuleComponent } from "../components/drop-down-capsule/drop-down-capsule.component";
import { CommonModule } from '@angular/common';
import { NgCircleProgressModule } from 'ng-circle-progress';
@NgModule({
    declarations:[SampleComponent, TandCComponent, DropDownCapsuleComponent],
    exports:[SampleComponent, TandCComponent, DropDownCapsuleComponent],
    entryComponents: [TandCComponent],
    imports: [CommonModule,NgCircleProgressModule]
})

export class ComponentsModule{}