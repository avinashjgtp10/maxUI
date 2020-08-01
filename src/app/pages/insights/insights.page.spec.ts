import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InsightsPage } from './insights.page';

describe('InsightsPage', () => {
  let component: InsightsPage;
  let fixture: ComponentFixture<InsightsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsightsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InsightsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
