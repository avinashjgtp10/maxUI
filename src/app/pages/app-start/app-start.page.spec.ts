import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AppStartPage } from './app-start.page';

describe('AppStartPage', () => {
  let component: AppStartPage;
  let fixture: ComponentFixture<AppStartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppStartPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AppStartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
