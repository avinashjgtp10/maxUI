import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DietPlanPage } from './diet-plan.page';

describe('DietPlanPage', () => {
  let component: DietPlanPage;
  let fixture: ComponentFixture<DietPlanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietPlanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DietPlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
