import { Component, Input, ChangeDetectionStrategy, OnDestroy, OnChanges, SimpleChanges, DoCheck, KeyValueDiffers, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'sensor-grid-item',
    templateUrl: './sensor-grid-item.component.html',
    styleUrls: ['./sensor-grid-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SensorGridItemComponent implements DoCheck {
    @Input() sensor: ISensor;
    differ: any;
    constructor(private differs: KeyValueDiffers, private cdr: ChangeDetectorRef) {
        this.differ = differs.find({}).create();
    }

    ngDoCheck() {
        let changes = this.differ.diff(this.sensor);
        if (changes) {
            this.cdr.markForCheck();
        }
    }
}
