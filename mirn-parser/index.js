/* 
The constructor method of MirnParser class accepts string only
The lenght of the string must be 10 or 11 characters
An instance of the class should expose properties containing data inferred from the MIRN:

Mirn {
 market
 jurisdiction
 distributor
 physical
 logical
 checksum
}

The Mirn class should have methods to display the value in a 
(1) standardised form (11 digits), 
(2) without a checksum (10 digits), 
(3) and in a "pretty" form (11 digits with the checksum digit separated using a "/").

The MIRN example: 5600012357
**/

const metadataMIRN = require("./metadataMIRN");

const testMirn = "5600012357";

function validateProvidedMirn(mirn_string) {
    // Simple MIRN validation
    if (mirn_string === undefined || mirn_string === null) {
        throw "[MIRN_PARSER ARGUMENT ERROR] No MIRN provided";
    } else if (typeof mirn_string !== "string") {
        throw "[MIRN_PARSER ARGUMENT ERROR] MIRN must be provided as a string";
    } else if (mirn_string.length > 11 || mirn_string.length < 10) {
        throw new Error("[MIRN_PARSER ARGUMENT ERROR] The length of the provided MIRN must be 10 or 11 digits.");
    }
}

class MirnParser {
    constructor(mirn_string) {
        validateProvidedMirn(mirn_string);
        this.mirn_string = mirn_string;
    }

    calculateCheckSum(mirn_string) {
        let sum = 0;
        let mirnAsciiValues = [];

        // Convert MIRN string to ASCII values
        for (let i = 0; i <= mirn_string.length - 1; i++) {
            mirnAsciiValues.push(mirn_string[i].charCodeAt(0));
        }
        // Iterate through MIRN ASCII VALUES using INDEX from the most right
        for (let index = 9; index >= 0; index--) {
            // Double the ASCII value if the character is the right most of the MIRN or an alternate
            if (index % 2 !== 0) {
                let num = mirnAsciiValues[index];
                num = num * 2;
                let numString = num.toString();
                let numStringArray = numString.split("");
                let sumOfDigits = numStringArray.reduce((x, y) => parseInt(x) + parseInt(y));
                sum = sum + sumOfDigits;
            } else {
                // Dont double the ASCII value
                let num = mirnAsciiValues[index];
                let numString = num.toString();
                let numStringArray = numString.split("");
                let sumOfDigits = numStringArray.reduce((x, y) => parseInt(x) + parseInt(y));
                sum = sum + sumOfDigits;
            }
        }
        // Find The next highest multiple of 10 is 100.
        let nearestTenMultiply = Math.ceil(sum / 10) * 10;
        // Checksum is the difference
        let checkSum = nearestTenMultiply - sum;
        // Return the checksum
        return checkSum;
    }

    standardMirnFormat() {
        if (this.mirn_string.length === 11) {
            return `[MIRN_PARSER INFO] Standard MIRN format: ${this.mirn_string}`;
        } else {
            let checkSum = this.calculateCheckSum(this.mirn_string);
            return `[MIRN_PARSER INFO] Standard MIRN format: ${this.mirn_string}${checkSum}`;
        }
    }

    noChecksumFormat() {
        const standardMirnFormat = `[MIRN_PARSER INFO] Standard MIRN format (no checksum): ${this.mirn_string.slice(0, 10)}`;
        return standardMirnFormat;
    }

    prettyMirnFormat() {
        // If MIRN length is 11 digits then just return the string in a pretty form
        if (this.mirn_string.length === 11) {
            return `[MIRN_PARSER INFO] Pretty format: ${this.mirn_string.slice(0, 10)}/${this.mirn_string[10]}`;
        } else {
            // Calculate the cheksum and concat right the result to the MIRN string
            let checkSum = this.calculateCheckSum(this.mirn_string);
            let mirntPrettyFormat = `[MIRN_PARSER INFO] Pretty format: ${this.mirn_string.slice(0, 10)}/${checkSum}`;
            return mirntPrettyFormat;
        }
    }

    // Properties getters
    get market() {
        let identifier = this.mirn_string[0];
        return `Market: ${metadataMIRN["position_1"][identifier]}`;
    }
    get jurisdiction() {
        let identifier = this.mirn_string[1];
        return `Jurisdiction: ${metadataMIRN["position_2"][identifier]}`;
    }
    get distributor() {
        let identifier = this.mirn_string[2];
        let state = this.mirn_string[1];
        return `Distributor: ${metadataMIRN["position_3"][state][identifier]}`;
    }
    get physical() {
        let identifier = this.mirn_string[8];
        let state = this.mirn_string[1];
        let administeredByAemo = this.mirn_string[2] === "0" ? true : false;
        if (administeredByAemo) {
            if (state === "3" || state === "4") {
                return `${metadataMIRN["position_9"][identifier]}`;
            } else {
                return `[MIRN_PARSER INFO] Physical: Not available in this state.`;
            }
        } else {
            return `[MIRN_PARSER INFO] Physical: For CTM MIRNs administered by AEMO only.`;
        }
    }
    // Same functionality as physical
    get logical() {}
    get checksum() {
        if (this.mirn_string.length === 11) {
            let checkSum = this.mirn_string.slice(-1);
            return `[MIRN_PARSER INFO] Checksum: ${checkSum}`;
        } else {
            let checkSum = this.calculateCheckSum(this.mirn_string);
            return `[MIRN_PARSER INFO] Checksum: ${checkSum}`;
        }
    }

    get mirnMetaOverview() {
        let market = this.market;
        let jurisdiction = this.jurisdiction;
        let distributor = this.distributor;
        return `\n [MIRN_PARSER INFO] Details: \n
        MIRN: ${this.mirn_string}\n
        ${market}\n
        ${jurisdiction}\n
        ${distributor}\n
        -- END --\n`;
    }
}

module.exports = MirnParser;
