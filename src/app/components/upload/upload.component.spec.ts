import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { By } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { ChartState } from 'src/app/store/chart.state';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { UploadComponent } from './upload.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { FormsModule } from '@angular/forms';

describe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;
  let el: HTMLElement;
  let db: DebugElement;
  let loader: HarnessLoader;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploadComponent],
      imports: [
        NgxsModule.forRoot([ChartState]),
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        FormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('column data should be visible', () => {
    fixture.detectChanges();
    el = fixture.debugElement.queryAll(By.css('.mat-form-field .mat-select'))[0]?.nativeElement;
    expect(el).toBeDefined();
  });

  it('data series shouldn not be visible', async () => {
    let selects = await loader.getAllHarnesses(MatSelectHarness);
    expect(selects?.length).toBe(1);
  })

  it('data series should be visible', async () => {
    let selects = await loader.getAllHarnesses(MatSelectHarness);
    expect(selects?.length).toBe(1);
    const chartTypeSelect = selects[0];
    await chartTypeSelect.open();
    const options = await chartTypeSelect.getOptions({ text: 'Bar' });
    const barOption = options[0];
    await barOption.click();
    selects = await loader.getAllHarnesses(MatSelectHarness);
    expect(selects?.length).toBe(2);
    const dataSeriesSelect = selects[1];
    expect(dataSeriesSelect).toBeDefined();
  });

});
