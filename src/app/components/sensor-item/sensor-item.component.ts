import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SensorService} from 'src/app/services/sensor.service';

@Component({
    selector: 'sensor-item',
    templateUrl: './sensor-item.component.html',
    styleUrls: ['./sensor-item.component.scss'],
})
export class SensorItemComponent implements OnInit {
    sensor: ISensor = {key: null, value: null, time: null, updateInterval: null};
    constructor (private route: ActivatedRoute, private _sensorService: SensorService) {}

    ngOnInit() {
        this.sensor = this._sensorService.getSensor(this.route.snapshot.params['id']);
        console.log(this.route.snapshot.params['id']);
    }
}
