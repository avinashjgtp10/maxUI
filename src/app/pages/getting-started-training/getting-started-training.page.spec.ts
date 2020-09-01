import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GettingStartedTrainingPage } from './getting-started-training.page';

describe('GettingStartedTrainingPage', () => {
  let component: GettingStartedTrainingPage;
  let fixture: ComponentFixture<GettingStartedTrainingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GettingStartedTrainingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GettingStartedTrainingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
