const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  jobApkHome,
  cities,
  employeeRegister,
  employees,
  employeeDetails,
  employeeUpdate,
} = require("../controllers/EmployeeController");

router.get("/register", auth, jobApkHome);

router.get("/cities", auth, cities);

router.get("/employees", auth, employees);

router.post("/updatePage", auth, employeeDetails);

router.post("/store", auth, employeeRegister);

router.post("/updateEmployee", auth, employeeUpdate);

module.exports = router;
