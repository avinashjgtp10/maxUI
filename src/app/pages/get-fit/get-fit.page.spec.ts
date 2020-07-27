import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GetFitPage } from './get-fit.page';

describe('GetFitPage', () => {
  let component: GetFitPage;
  let fixture: ComponentFixture<GetFitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetFitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GetFitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
