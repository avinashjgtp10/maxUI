import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TandCComponent } from './tand-c.component';

describe('TandCComponent', () => {
  let component: TandCComponent;
  let fixture: ComponentFixture<TandCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TandCComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TandCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
