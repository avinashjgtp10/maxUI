import { NgModule } from "@angular/core";

import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { HomePageRoutingModule } from "./home-routing.module";
import { CommonModule } from "@angular/common";

import { HomePage } from "./home.page";
import { ComponentsModule } from "../../components/components.module";
import { PipesModule } from "../../pipes/pipes.module";
import { ToastProvider } from "src/app/services/toast/toast";
import { WeightTrackerPageModule } from "../weight-tracker/weight-tracker.module";
import { HandwashTrackerPageModule } from "../handwash-tracker/handwash-tracker.module";
import { WaterTrackerPageModule } from "../water-tracker/water-tracker.module";
import { AddCaloriePage } from "../add-calorie/add-calorie.page";
import { CalorieTrackerPage } from '../calorie-tracker/calorie-tracker.page';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    PipesModule,
    HomePageRoutingModule,
    WeightTrackerPageModule,
    HandwashTrackerPageModule,
    WaterTrackerPageModule,
  ],
  declarations: [HomePage, AddCaloriePage, CalorieTrackerPage],
  providers: [ToastProvider],
})
export class HomePageModule {}
