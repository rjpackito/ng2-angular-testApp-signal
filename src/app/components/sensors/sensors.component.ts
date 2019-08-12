import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SensorService } from '../../services/sensor.service';

@Component({
    selector: 'sensors',
    templateUrl: './sensors.component.html',
    styleUrls: ['./sensors.component.scss']
})
export class SensorsComponent implements OnInit {
    items = [];
    isModeAuto: boolean = true;
    intervalId = null;

    constructor(private _sensorService: SensorService) { }
    ngOnInit() {
        this.changeMode();
    }
    private compareSensors(sensorA: ISensor, sensorB: ISensor) {
        if (sensorA.key > sensorB.key) {
            return 1;
        }
        else if (sensorA.key < sensorB.key) {
            return -1;
        }
        else return 0;
    }
    public changeMode() {
        if (!this.isModeAuto) {
            clearInterval(this.intervalId);
        }
        else {
            this.intervalId = setInterval(() => {
                this.items = this._sensorService.getSensors(false).sort(this.compareSensors);
            }, 1000);
        }
    }
    public manualUpdate() {
        this.items = this._sensorService.getSensors(false).sort(this.compareSensors);
    }
}
