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
                this.updateItems(this._sensorService.getSensors(true, 1000));
            }, 1000);
        }
    }

    public manualUpdate() {
        this.updateItems(this._sensorService.getSensors(false));
    }
    
    private updateItems(items: ISensor[]){
        let updateDict = items.map((item,index)=>{
            let oldIndex= this.items.findIndex(oldItem=>(item.key==oldItem.key && oldItem.value!=item.value))
            if(oldIndex!=-1)
                return {old: oldIndex,new: index};
        }).filter(s=>s);
        updateDict.forEach(indexes=> {
            this.items[indexes.old].value=items[indexes.new].value;
            this.items[indexes.old].time=items[indexes.new].time
        });
    }
}
