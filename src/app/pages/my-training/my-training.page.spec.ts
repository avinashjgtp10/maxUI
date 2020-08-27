import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyTrainingPage } from './my-training.page';

describe('MyTrainingPage', () => {
  let component: MyTrainingPage;
  let fixture: ComponentFixture<MyTrainingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTrainingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyTrainingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
