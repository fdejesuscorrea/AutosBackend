// dummyObject.test.js
const DummyObject = require('../routes/dummyObject');

describe('DummyObject', () => {
  beforeEach(() => {
    DummyObject.reset();
  });

  it('should increment value', () => {
    DummyObject.increment();
    expect(DummyObject.getValue()).toBe(1);
  });

  it('should decrement value', () => {
    DummyObject.decrement();
    expect(DummyObject.getValue()).toBe(-1);
  });

  it('should reset value to 0', () => {
    DummyObject.increment();
    DummyObject.reset();
    expect(DummyObject.getValue()).toBe(0);
  });

  it('should set value', () => {
    DummyObject.setValue(5);
    expect(DummyObject.getValue()).toBe(5);
  });

  it('should be positive', () => {
    DummyObject.setValue(3);
    expect(DummyObject.isPositive()).toBe(true);
  });

  it('should be negative', () => {
    DummyObject.setValue(-3);
    expect(DummyObject.isNegative()).toBe(true);
  });

  it('should be zero', () => {
    expect(DummyObject.isZero()).toBe(true);
  });

  it('should multiply value by two', () => {
    DummyObject.setValue(3);
    DummyObject.multiplyByTwo();
    expect(DummyObject.getValue()).toBe(6);
  });

  it('should divide value by two', () => {
    DummyObject.setValue(6);
    DummyObject.divideByTwo();
    expect(DummyObject.getValue()).toBe(3);
  });
});
