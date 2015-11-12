describe("evaluate", function() {
    it("adds when provided values and + operator", function() {
        expect(evaluate("22", "23", "+")).toEqual(45);
    });
    it("finds difference when provided values and - operator", function() {
        expect(evaluate("6.28", "2.0", "-")).toEqual(4.28);
    });
    it("multiplies when provided values and * operator", function() {
        expect(evaluate("2", "2", "*")).toEqual(4);
    });
    it("divides when provided values and / operator", function() {
        expect(evaluate("2025", "45", "/")).toEqual(45);
    });
});

function setUpHTML() {
    jasmine.getFixtures().set('<form class="user-details"><input id="operand1" type="text" class="input-boxes" placeholder="Operand" pattern="\-?\d*(\.\d*)?" onkeyup="displayResult();"><input id="operator" type="text" class="input-boxes narrow" placeholder="Operator" pattern="[+-^*/]" onkeyup="displayResult();"><input id="operand2" type="text" class="input-boxes" placeholder="Operand" pattern="\-?\d*(\.\d*)?" onkeyup="displayResult();"><span class="equator"> = </span><input id="result" type="text" class="input-boxes" placeholder="Result" pattern="\-?\d*(\.\d*)?" readonly></form>');
}

describe("Operand", function () {
    beforeEach(function() {
        setUpHTML();
        document.getElementById("operand1").value = "22";
        operand1 = new Operand("operand1");
    });
    it("should get value from dom element", function() {
        expect(operand1.value).toBe("22");
    });
    it("should should return true if value is a number", function() {
        expect(operand1.validate()).toBeTruthy();
    });
    it("should should return false if value is not a number", function() {
        operand1.value = "sorry";
        expect(operand1.validate()).toBeFalsy();
    });
});

describe("Operator", function() {
    beforeEach(function() {
        setUpHTML();
        document.getElementById("operator").value = "*";
        operator = new Operator("operator");
    });
    it("should get value from dom element", function() {
        expect(operator.value).toBe("*");
    });
    it("should should return true if value is a number", function() {
        expect(operator.validate()).toBeTruthy();
    });
    it("should should return false if value is not a number", function() {
        operator.value = "sorry";
        expect(operator.validate()).toBeFalsy();
    });
});

describe("getResult", function() {
    beforeEach(function() {
        setUpHTML();
        document.getElementById("operand1").value = "6";
        document.getElementById("operator").value = "*";
        document.getElementById("operand2").value = "15";
    });
    it("should return correct result", function() {
        expect(getResult()).toBe(90);
    });
    it("should return Invalid if something operator is invalid", function() {
        document.getElementById("operator").value = "r";
        expect(getResult()).toBe("Invalid");
    });
    it("should return Invalid if something operand is invalid", function() {
        document.getElementById("operand2").value = "$56";
        expect(getResult()).toBe("Invalid");
    });
});

describe("displayResult", function() {
    beforeEach(function() {
        setUpHTML();
        document.getElementById("operand1").value = "6";
        document.getElementById("operator").value = "*";
        document.getElementById("operand2").value = "15";
    });
    it("adds value to result element after evaluating", function() {
        displayResult();
        expect(document.getElementById("result").value).toBe("90");
    });
    it("adds text Invalid to result element if any element is invalid", function() {
        document.getElementById("operator").value = "$";
        displayResult();
        expect(document.getElementById("result").value).toBe("Invalid");
    });
});
