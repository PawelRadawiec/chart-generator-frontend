import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
  let loader: HarnessLoader;

  beforeEach(async () => {
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('data series shouldn not be visible', async () => {
    let selects = await loader.getAllHarnesses(MatSelectHarness);
    expect(selects?.length).toBe(1);
  })

  it('data series should be visible', async () => {
    let selects = await loader.getAllHarnesses(MatSelectHarness.with({ selector: '#type' }));
    const typeSelect = selects[0];
    expect(typeSelect).toBeDefined();
    expect(selects?.length).toBe(1);
    await typeSelect.open();
    const options = await typeSelect.getOptions({ text: 'Bar' });
    const barOption = options[0];
    await barOption.click();

    selects = await loader.getAllHarnesses(MatSelectHarness);
    expect(selects?.length).toBe(2);
    expect(await loader.getHarness(MatSelectHarness.with({ selector: '#dataSeriesType' }))).toBeDefined();
  });

});
