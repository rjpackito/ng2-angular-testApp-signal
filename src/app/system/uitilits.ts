export class Utility {
    static randomValueForSensor() {
        return this.randomValueFromRange(-50000, 50000);
    }

    static randomValueForUpdateInterval() {
        const value = this.randomValueFromRange(1, 10);
        switch (value) {
            case 1:
                return 10;
            case 2:
                return 1000;
            case 3:
                return 100;
            case 4:
                return 60000;
            case 5:
                return 10000;
            case 6:
                return 3600000;
            case 7:
                return 60000;
            case 8:
                return 10000;
            case 9:
                return 100000;
            case 10:
                return 60000;
        }
    }

    private static randomValueFromRange(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    static formatNumber(value: number){
        return value.toLocaleString('ru-RU', { minimumIntegerDigits: 5, useGrouping: false });
    }
}