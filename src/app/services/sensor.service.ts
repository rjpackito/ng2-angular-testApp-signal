import {Injectable} from '@angular/core';
import {Utility} from '../system/uitilits';

const LOCAL_STORAGE_SENSORS_INFO = "SENSORS_INFO";

@Injectable()
export class SensorService {
    private sensorsInfo: ISensorsInfo;

    getSensor(key: string): ISensor {
        if (localStorage.getItem(LOCAL_STORAGE_SENSORS_INFO))
            this.sensorsInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SENSORS_INFO));
        return this.sensorsInfo.sensors.find(s => s.key === key);
    }
    getSensors(isModeAuto: boolean, timeout?: number): ISensor[] {
        if (localStorage.getItem(LOCAL_STORAGE_SENSORS_INFO)) {
            this.sensorsInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SENSORS_INFO));
            if (isModeAuto) {
                if (Math.abs(new Date(this.sensorsInfo.updateAt).getTime() - new Date().getTime()) > timeout) {
                    this.updateSensorsInfo(false);
                }
            }
            else {
                this.updateSensorsInfo(false);
            }
        }
        else {
            this.updateSensorsInfo(true);
        }
        return this.sensorsInfo.sensors.sort(this.compareSensors);
    }
    private updateSensorsInfo(isNewInfo: boolean): ISensorsInfo {
        if (isNewInfo) {
            this.sensorsInfo = {sensors: [], updateAt: null};
        }
        for (let index = 0; index < 5000; index++) {
            if (isNewInfo) {
                this.sensorsInfo.sensors.push({
                    key: `Sensor_${Utility.formatNumber(index + 1)}`,
                    value: null,
                    updateInterval: Utility.randomValueForUpdateInterval(),
                    time: new Date()
                });
            }
            if (Math.abs(new Date(this.sensorsInfo.sensors[index].time).getTime() - new Date().getTime()) > this.sensorsInfo.sensors[index].updateInterval || isNewInfo) {
                this.sensorsInfo.sensors[index].value = Utility.randomValueForSensor();
                this.sensorsInfo.sensors[index].time = new Date();
            }
        }
        this.sensorsInfo.updateAt = new Date();
        localStorage.setItem(LOCAL_STORAGE_SENSORS_INFO, JSON.stringify(this.sensorsInfo));
        return this.sensorsInfo;
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
}
