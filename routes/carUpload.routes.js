const { BillPolicy } = require("../policies");
const { Car } = require("../data/db");
const { Router } = require("express");
const VerifyToken = require("../middlewares/authorize.middleware");
const router = Router();
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const xlsxFile = require("read-excel-file/node");
const inputPlates = [];
//aqui empieza solucion problema seguridad ante DDOs
const form = new Formidable();
form.maxFileSize = 10000000; // Sensitive: 10MB is more than the recommended limit of 8MB

const formDefault = new Formidable()
let diskUpload = multer({
  storage: diskStorage,
  limits: {
    fileSize: 10000000 // Sensitive: 10MB is more than the recommended limit of 8MB
  }
});

let diskUploadUnlimited = multer({ // Sensitive: the default value is no limit
  storage: diskStorage,
});


//aqui termina solucion ...
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./excel");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + path.extname(file.originalname));
  },
});
const upload = multer({ storage });
router.post("/upload", VerifyToken, upload.single("excel"), async(req, res) => {
  await Car.update({disabled:true},{where:{}});
  xlsxFile(path.join(__dirname, "/../excel/excel.xlsx"))
    .then((rows) => {
      rows.slice(1).forEach(async (row) => {
        const licensePlate = row[0];
        if (licensePlate == null) {
          return;
        }
        inputPlates.push(licensePlate);
        const carModel = row[1];
        const carBrand = row[2];
        const carDetail = row[3];
        const repairDetail = row[4];
        const cari = {};
        const car = await Car.findAll({
          where: { licensePlate: licensePlate },
        });
        if (car.length == 0) {
          const repairCost = BillPolicy(carModel);
          await Car.create({
            licensePlate,
            carBrand,
            carModel,
            carDetail,
            repairDetail,
            repairCost,
            disabled: false,
            carImage: "",
          });
        } else {
          cari.licensePlate = licensePlate;
          if (carBrand != null) {
            cari.carBrand = carBrand;
          }
          if (carDetail != null) {
            cari.carDetail = carDetail;
          }
          if (repairDetail != null) {
            cari.repairDetail = repairDetail;
          }
          if (carModel != null) {
            cari.carModel = carModel;
            cari.repairCost = BillPolicy(carModel);
          }
          cari.disabled=false;
          await Car.update(cari, { where: { licensePlate: licensePlate } }).catch();
        }
      });
      try{
        fs.unlinkSync(path.join(__dirname+ "/../excel/excel.xlsx"));
      }catch{

      }
      return res.status(200).json({message:"cargao"});

    })
    .catch(console.log);
    
}

);

module.exports = router;
