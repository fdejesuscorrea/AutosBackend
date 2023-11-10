// dummyObject.js
const DummyObject = {
    value: 0,
  
    increment: function () {
      this.value++;
    },
  
    decrement: function () {
      this.value--;
    },
  
    reset: function () {
      this.value = 0;
    },
  
    getValue: function () {
      return this.value;
    },
  
    setValue: function (newValue) {
      this.value = newValue;
    },
  
    isPositive: function () {
      return this.value > 0;
    },
  
    isNegative: function () {
      return this.value < 0;
    },
  
    isZero: function () {
      return this.value === 0;
    },
  
    multiplyByTwo: function () {
      this.value *= 2;
    },
  
    divideByTwo: function () {
      this.value /= 2;
    },
  };
  
  module.exports = DummyObject;
  