import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InventoryManagementPage } from './inventory-management.page';

describe('InventoryManagementPage', () => {
  let component: InventoryManagementPage;
  let fixture: ComponentFixture<InventoryManagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryManagementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
