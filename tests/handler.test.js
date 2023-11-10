const {index, isCarLicensePlate} = require('../routes/index.js');

describe('Test Handler', ()=>{
    test("Retorna verdadero si la placa es valida", ()=>{
        expect(isCarLicensePlate("ABC123")).toBe(true);
    });

    test("Arroja error si la placa es invalida", ()=>{
        expect(isCarLicensePlate("AAA123")).toThrow();
    });

    test("Arroja un error si la placa esta vacia", ()=>{
        expect(isCarLicensePlate("")).toThrow();
    });

    test("Arroja un error si la placa esta vacia", ()=>{
        expect(isCarLicensePlate(123)).toThrow();
    });
});