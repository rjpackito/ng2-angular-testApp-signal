import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {SensorService} from '../../services/sensor.service';

@Component({
    selector: 'sensors',
    templateUrl: './sensors.component.html',
    styleUrls: ['./sensors.component.scss']
})
export class SensorsComponent implements OnInit {
    items = [];
    isModeAuto: boolean = true;
    intervalId = null;

    constructor (private _sensorService: SensorService) {}

    ngOnInit() {
        this.items = this._sensorService.getSensors(true, 1000);
        this.changeMode();
    }

    public changeMode() {
        if (!this.isModeAuto) {
            clearInterval(this.intervalId);
        }
        else {
            this.intervalId = setInterval(() => {
                this.items = this._sensorService.getSensors(true, 1000);
            }, 1000);
        }
    }

    public manualUpdate() {
        this.items = this._sensorService.getSensors(false);
    }
}
