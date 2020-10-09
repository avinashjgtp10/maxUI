import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyPlanPage } from './my-plan.page';

describe('MyPlanPage', () => {
  let component: MyPlanPage;
  let fixture: ComponentFixture<MyPlanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPlanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyPlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
