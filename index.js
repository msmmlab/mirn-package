const MirnParser = require("mirn-parser");

// Sample instance with MIRN of 5500000278

try {
    const mirn = new MirnParser("5500000278");
    console.log(mirn.mirnMetaOverview);
    console.log(mirn.checksum);
    console.log(mirn.distributor);
} catch (error) {
    console.log(error.message);
}
