import { NgModule } from '@angular/core';
import {SamplePipe} from './sample/sample.pipe';
import { FixedValuePipe } from './fixedValue/fixed-value.pipe';

@NgModule({
declarations: [SamplePipe, FixedValuePipe],
imports: [],
exports: [SamplePipe, FixedValuePipe],
})

export class PipesModule {}