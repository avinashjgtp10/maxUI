import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CalendarSelectionPage } from './calendar-selection.page';

describe('CalendarSelectionPage', () => {
  let component: CalendarSelectionPage;
  let fixture: ComponentFixture<CalendarSelectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarSelectionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
