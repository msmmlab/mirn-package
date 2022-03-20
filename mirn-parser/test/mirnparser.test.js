const MinParser = require("../index");

// Check if the provided MIRN has appropriate length of 10 or 11 digits
test('MIRN that is too short -> "55000002" should throw a length error', () => {
    expect(() => {
        new MinParser("55000002");
    }).toThrow("[MIRN_PARSER ARGUMENT ERROR] The length of the provided MIRN must be 10 or 11 digits.");
});

// Check if argument privided is not null
test("MIRN num null should throw a argument error", () => {
    expect(() => {
        new MinParser(null);
    }).toThrow("[MIRN_PARSER ARGUMENT ERROR] No MIRN provided");
});

// Check if proper checksum is calculated
test('MIRN num "5500000278" -> valid checksum: 4 -> should return standard format of "55000002784"', () => {
    expect(new MinParser("5500000278").standardMirnFormat()).toBe("[MIRN_PARSER INFO] Standard MIRN format: 55000002784");
});
test('MIRN num "5600003074" -> valid checksum: 3 -> should return standard format of "56000030743"', () => {
    expect(new MinParser("5600003074").standardMirnFormat()).toBe("[MIRN_PARSER INFO] Standard MIRN format: 56000030743");
});
test('MIRN num "5600008129" -> valid checksum: 0 -> should return standard format of "56000081290"', () => {
    expect(new MinParser("5600008129").standardMirnFormat()).toBe("[MIRN_PARSER INFO] Standard MIRN format: 56000081290");
});

// Check if pretty format is returned
test('MIRN num "5500000278" should return pretty format of "5500000278/4"', () => {
    expect(new MinParser("5500000278").prettyMirnFormat()).toBe("[MIRN_PARSER INFO] Pretty format: 5500000278/4");
});
test('MIRN num "55000002784" should return pretty format of "5500000278/4"', () => {
    expect(new MinParser("55000002784").prettyMirnFormat()).toBe("[MIRN_PARSER INFO] Pretty format: 5500000278/4");
});
