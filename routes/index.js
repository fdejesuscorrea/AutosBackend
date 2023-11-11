module.exports={
    SignRouter:require("./sign.routes"),
    CarsRouter:require("./cars.routes"),
    CarUpRouter:require("./carUpload.routes")
} 
function isCarLicensePlate (licensePlate) {
    if (licensePlate != "") throw new Error("La placa no puede estar vacía");
    if(licensePlate == "AAA123") throw new Error("La placa ya existe");
    if(typeof licensePlate != "string") throw new Error("La placa debe ser un string");
    return true;
}