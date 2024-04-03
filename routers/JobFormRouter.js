const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {jobApkAjaxHome,jobApkCrudHome} = require("../controllers/EmployeeControllers/homePageEmployeeController");

const {cities} = require("../controllers/EmployeeControllers/cityEmployeeController");

const {employeeRegister} = require("../controllers/EmployeeControllers/registerEmployeeController");

const {AjaxCrudEmployees,NormalCrudEmployees} = require("../controllers/EmployeeControllers/listEmployeeController");

const {EmployeeDetailsUpdatePage} = require("../controllers/EmployeeControllers/employeeDetailsPageController");

const {AjaxEmployeeDetailsUpdatePage} = require("../controllers/EmployeeControllers/ajaxEmployeeDetailsPageController");

const {employeeUpdate} = require("../controllers/EmployeeControllers/updateEmployeeController");

router.get("/crud/register",auth,jobApkAjaxHome);

router.post("/crud/register",auth,employeeRegister);

router.get("/crud/employees",auth,NormalCrudEmployees);

router.post("/crud/updatePage",auth,EmployeeDetailsUpdatePage);

router.post("/crud/updateEmployee",auth,employeeUpdate);

router.get("/register", auth, jobApkCrudHome);

router.get("/cities", auth, cities);

router.get("/employees", auth, AjaxCrudEmployees);

router.post("/updatePage", auth, AjaxEmployeeDetailsUpdatePage);

router.post("/store", auth, employeeRegister);

router.post("/updateEmployee", auth, employeeUpdate);

module.exports = router;