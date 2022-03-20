# MIRN-PARSER PACKAGE
The 'mirn-parser' is a package enabling processing provided MIRN numbers.

# NODE_MODULES
The package has been added to local module to simplify usage across the system.
The package can be used through require import -> const MirnParser = require("mirn-parser");

# ARGUMENTS
A class based component with constructor accepting MIRN number as a string with length of 10 or 11 characters.
Basic validation check if argument is not present or not meeting the criteria.

# CLASS METHODS
calculateCheckSum() -> method to calculate MIRN checksum if not provided
standardMirnFormat() -> method to display the value in a standardised form (11 digits)
noChecksumFormat() -> method to display the value without a checksum
prettyMirnFormat() -> method to display the value in a "pretty" form (11 digits with the checksum digit separated using a "/").

# CLASS PROPERTIES
A number of getters has been implemented to provide detailed info (metadata) inferred from MIRN numbers
Getters:
    get market()
    get jurisdiction()
    get distributor()
    get logical()
    get checksum()
    get mirnMetaOverview()

# TESTING
Basic test functionality has been implemented.
To run tests:
(1) Go to mirn-parser directory
(2) please install jest library (npm install --save jest) then use command npm run test

# SAMPLE USAGE
To run the basic example:
(1) Go to the root director
(2) Run node index.js


