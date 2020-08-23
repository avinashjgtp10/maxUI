import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddWeightGoalPage } from './add-weight-goal.page';

describe('AddWeightGoalPage', () => {
  let component: AddWeightGoalPage;
  let fixture: ComponentFixture<AddWeightGoalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWeightGoalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddWeightGoalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
