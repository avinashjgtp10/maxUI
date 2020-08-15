import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DateSliderPage } from './date-slider.page';

describe('DateSliderPage', () => {
  let component: DateSliderPage;
  let fixture: ComponentFixture<DateSliderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateSliderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DateSliderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
