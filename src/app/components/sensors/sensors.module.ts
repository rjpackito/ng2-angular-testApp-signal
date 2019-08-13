import {NgModule} from "@angular/core";
import {FormsModule} from '@angular/forms';
import {SensorsComponent} from './sensors.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {SensorService} from 'src/app/services/sensor.service';
import {SensorGridItemComponent} from '../sensor-grid-item/sensor-grid-item.component';
import {SensorItemComponent} from '../sensor-item/sensor-item.component';

@NgModule(
    {
        declarations: [
            SensorsComponent,
            SensorGridItemComponent,
            SensorItemComponent
        ],
        imports: [
            CommonModule,
            FormsModule,
            RouterModule.forChild([
                {path: "", component: SensorsComponent},
                {path: "sensor/:id", component: SensorItemComponent}
            ])],
        exports: [
            RouterModule
        ],
        providers: [SensorService]
    }
)
export class SensorsModule {}