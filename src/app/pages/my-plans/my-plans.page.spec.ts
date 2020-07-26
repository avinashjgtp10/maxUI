import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyPlansPage } from './my-plans.page';

describe('MyPlansPage', () => {
  let component: MyPlansPage;
  let fixture: ComponentFixture<MyPlansPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPlansPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyPlansPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
