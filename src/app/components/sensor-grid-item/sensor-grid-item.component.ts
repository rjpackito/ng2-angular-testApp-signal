import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'sensor-grid-item',
    templateUrl: './sensor-grid-item.component.html',
    styleUrls: ['./sensor-grid-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SensorGridItemComponent {
    @Input() sensor: ISensor;
}
