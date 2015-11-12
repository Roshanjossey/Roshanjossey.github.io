var Operand = function(operandId) {
    this.value = document.getElementById(operandId).value;
};
Operand.prototype.validate = function() {
    value = this.value
    var floatPattern = /\-?\d*(\.\d*)?/;
    return (floatPattern.exec(value)[0] == value && value != "");
}

var Operator = function(operandId) {
    this.value = document.getElementById(operandId).value;
};
Operator.prototype.validate = function() {
    value = this.value
    var operatorPattern = /[\+\-*\/\^\&\%]/;
    return (operatorPattern.exec(value) != null && operatorPattern.exec(value)[0] == value);
}

function evaluate(operand1, operand2, operator) {
    return eval(operand1 + " " + operator + " " +operand2);
}

function getResult() {
    operand1 = new Operand("operand1");
    operand2 = new Operand("operand2");
    operator = new Operator("operator");
    if (operand1.validate() && operand2.validate() && operator.validate()) {
    return evaluate(operand1.value, operand2.value, operator.value);
    } else {
        return "Invalid";
    }
}

function displayResult() {
        document.getElementById("result").value = getResult();
}
