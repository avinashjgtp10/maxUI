import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShareTemplatePage } from './share-template.page';

describe('ShareTemplatePage', () => {
  let component: ShareTemplatePage;
  let fixture: ComponentFixture<ShareTemplatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareTemplatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShareTemplatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
