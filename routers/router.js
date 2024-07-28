const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const isLoggedIn = require("../middlewares/isLoggedIn");

const {
  userRegister,
  userActivate,
  userRemove,
  userAuthenticatation,
  userCheck,
} = require("../controllers/registerController");
const {
  userLogin,
  userForgot,
  userSetPassword,
  userRemoveAccesscode,
} = require("../controllers/loginController");

const {
  normalPagging,
  paggingOrderby,
} = require("../controllers/PaggingControllers/pageOrderbyController");

const {
  resultGrid,
  singleResult,
  singleAttendance,
} = require("../controllers/PaggingControllers/studentResultGridController");

const {
  pageWithAllFilter,
} = require("../controllers/PaggingControllers/paggingAllFilterController");

const {
  pageSearching,
  pageSearchFilter,
  pageSeachOptimium,
} = require("../controllers/PaggingControllers/searchingWithPaggingController");

const {
  pageDelimiterSearch,
} = require("../controllers/PaggingControllers/delimiterSearchingController");

const {
  jobApkAjaxHome,
  jobApkCrudHome,
} = require("../controllers/EmployeeControllers/homePageEmployeeController");

const {
  cities,
} = require("../controllers/EmployeeControllers/cityEmployeeController");

const {
  employeeRegister,
} = require("../controllers/EmployeeControllers/registerEmployeeController");

const {
  AjaxCrudEmployees,
  NormalCrudEmployees,
} = require("../controllers/EmployeeControllers/listEmployeeController");

const {
  EmployeeDetailsUpdatePage,
} = require("../controllers/EmployeeControllers/employeeDetailsPageController");

const {
  AjaxEmployeeDetailsUpdatePage,
} = require("../controllers/EmployeeControllers/ajaxEmployeeDetailsPageController");

const {
  employeeUpdate,
} = require("../controllers/EmployeeControllers/updateEmployeeController");

// Register Routes
router.get("/user/register", isLoggedIn, (req, res) => {
  res.render("Register", { message: null });
});

router.post("/user/register", isLoggedIn, userRegister);

router.get("/user/activate", isLoggedIn, userAuthenticatation);

router.get("/user/error", (req, res) => {
  res.render("error");
});

router.post("/user/activate", isLoggedIn, userActivate);

router.post("/user/check", userCheck);

router.post("/user/remove", userRemove);

// Login Routes
router.get("/user/login", isLoggedIn, (req, res) => {
  res.render("login", { message: null });
});

router.post("/user/login", userLogin);

router.get("/user/forgot", (req, res) => {
  res.render("Email");
});

router.post("/user/forgot", isLoggedIn, userForgot);

router.post("/user/removeAccess", userRemoveAccesscode);

router.get("/user/setPassword", isLoggedIn, userSetPassword);

//User's Routes
// router.use('/user',userRouter);
router.get("/user/home", auth, (req, res) => {
  res.render("Home", { message: null });
});

router.get("/user/jsEvents", auth, (req, res) => {
  res.render("jsEventListeners");
});

router.get("/user/dynamic_table", auth, (req, res) => {
  res.render("dynamic_table");
});

router.get("/user/kuku_cube", auth, (req, res) => {
  res.render("kuku_cube");
});

router.get("/user/tic_tac_toe", auth, (req, res) => {
  res.render("tic_tac_toe");
});

router.get("/user/logout", auth, (req, res) => {
  res.clearCookie("token");
  res.redirect("/api/user/login");
});

//Paggination Routes
// router.use('/user/pagging',pagginationRouter);
router.get("/user/pagging/", auth, normalPagging);

router.get("/user/pagging/orderby", auth, paggingOrderby);

router.get("/user/pagging/resultgrid", auth, resultGrid);
router.get("/user/pagging/resultgrid/singleResult", auth, singleResult);
router.get("/user/pagging/resultgrid/attendanceReport", auth, singleAttendance);

router.get("/user/pagging/allFilter", auth, pageWithAllFilter);

router.get("/user/pagging/searching", auth, pageSearching);
router.post("/user/pagging/searching/filter", auth, pageSearchFilter);
router.get("/user/pagging/searching/optimalFilter", auth, pageSeachOptimium);

router.get("/user/pagging/searching/delimiterSearch", auth, (req, res) => {
  let rows;
  res.render("delimiterSearch", { rows });
});
router.post(
  "/user/pagging/searching/delimiterSearch",
  auth,
  pageDelimiterSearch
);

router.get("/user/pagging/frontside", auth, (req, res) => {
  res.render("frontPagging");
});

router.get("/user/pagging/comments", auth, (req, res) => {
  id = req.query.id || 1;
  res.render("comments", { id });
});

// User's Job Application Form Routes
// router.use('/user/jobForm',jobFormRouter);

router.get("/user/jobForm/crud/register", auth, jobApkAjaxHome);

router.post("/user/jobForm/crud/register", auth, employeeRegister);

router.get("/user/jobForm/crud/employees", auth, NormalCrudEmployees);

router.post("/user/jobForm/crud/updatePage", auth, EmployeeDetailsUpdatePage);

router.post("/user/jobForm/crud/updateEmployee", auth, employeeUpdate);

router.get("/user/jobForm/register", auth, jobApkCrudHome);

router.get("/user/jobForm/cities", auth, cities);

router.get("/user/jobForm/employees", auth, AjaxCrudEmployees);

router.post("/user/jobForm/updatePage", auth, AjaxEmployeeDetailsUpdatePage);

router.post("/user/jobForm/store", auth, employeeRegister);

router.post("/user/jobForm/updateEmployee", auth, employeeUpdate);

module.exports = router;
