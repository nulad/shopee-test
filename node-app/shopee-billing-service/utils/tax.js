'use strict';

class FoodTaxCode {
    constructor() {
        this.refundable = true;
        this.calculate = price => (price / 10);
        this.type = 'Food & Beverage';
    }
}

class TobaccoTaxCode {
    constructor() {
        this.refundable = false;
        this.calculate = price => 10 + (price * 2 / 100);
        this.type = 'Tobacco';
    }
}

class EntertainmentTaxCode {
    constructor() {
        this.refundable = false;
        this.calculate = (price) => {
            if (price < 100) {
                return 0;
            }
            return (price - 100) / 100;
        };
        this.type = 'Entertainment';
    }
}

class TaxCalculator {
    constructor(taxCode) {
        switch (taxCode) {
        case 1:
            this.taxCode = new FoodTaxCode();
            break;
        case 2:
            this.taxCode = new TobaccoTaxCode();
            break;
        case 3:
            this.taxCode = new EntertainmentTaxCode();
            break;
        default:
            break;
        }
        this.refundable = this.taxCode.refundable;
        this.type = this.taxCode.type;
    }

    calculate(price) {
        return this.taxCode.calculate(price);
    }
}

module.exports = TaxCalculator;
