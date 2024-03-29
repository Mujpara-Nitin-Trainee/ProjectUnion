const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  jobApk,
  jobApkHome,
  cities,
  employeeRegister,
  employees,
  employeeDetails,
  employeeUpdate,
  emplist,
  empDetails
} = require("../controllers/EmployeeController");

router.get("/crud/register",auth,jobApk);

router.post("/crud/register",auth,employeeRegister);

router.get("/crud/employees",auth,emplist);

router.post("/crud/updatePage",auth,empDetails);

router.post("/crud/updateEmployee",auth,employeeUpdate);

router.get("/register", auth, jobApkHome);

router.get("/cities", auth, cities);

router.get("/employees", auth, employees);

router.post("/updatePage", auth, employeeDetails);

router.post("/store", auth, employeeRegister);

router.post("/updateEmployee", auth, employeeUpdate);

module.exports = router;
