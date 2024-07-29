var page = 0;
showTab(page);

function showTab(n) {
  var x = document.getElementsByClassName("col");
  // console.log(x);
  document.getElementById("submit").style.display = "none";
  // console.log(x[0]);

  x[n].style.display = "block";

  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }

  if (n == x.length - 1) {
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("submit").style.display = "inline";
  } else {
    document.getElementById("nextBtn").style.display = "inline";
  }
}

function nextPrev(n) {
  if (n == 1 && !validate(page)) return false;
  var x = document.getElementsByClassName("col");
  document.getElementById("submit").style.display = "none";
  x[page].style.display = "none";
  page = page + n;
  showTab(page);
}

function validate(page) {
  let isvalid = true;

  var letters = /^[A-Za-z]+$/;

  function isEmpty(val) {
    return val === undefined || val == null || val.length <= 0 || val == 0
      ? true
      : false;
  }

  if (page === 0) {
    let firstname = document.forms["form"]["firstname"].value;
    let lastname = document.forms["form"]["lastname"].value;
    let email = document.forms["form"]["email"].value;
    let mobileno = document.forms["form"]["mobileno"].value;
    let gender = document.forms["form"]["gender"].value;
    let dob = document.forms["form"]["dob"].value;
    let address = document.forms["form"]["address"].value;
    let city = document.forms["form"]["city"].value;
    let state = document.forms["form"]["state"].value;
    let zipcode = document.forms["form"]["zipcode"].value;
    let relation = document.forms["form"]["relation"].value;

    console.log(gender);

    if (isEmpty(firstname)) {
      let message = document.getElementById("firstname_error");
      message.innerHTML = "Filed Required*";
      message.style.color = "red";
      isvalid = false;
    } else if (firstname.length <= 2) {
      let message = document.getElementById("firstname_error");
      message.innerHTML = "FirstName Length Should be Greater Than 2";
      message.style.color = "red";
      isvalid = false;
    } else if (!firstname.match(letters)) {
      let message = document.getElementById("firstname_error");
      message.innerHTML =
        "FirstName Should not contain Special Character or numbers";
      message.style.color = "red";
      isvalid = false;
    }

    if (isEmpty(lastname)) {
      let message = document.getElementById("lastname_error");
      message.innerHTML = "Filed Required*";
      message.style.color = "red";
      isvalid = false;
    } else if (!lastname.match(letters)) {
      let message = document.getElementById("lastname_error");
      message.innerHTML =
        "Lastname Should not contain Special Character or numbers";
      message.style.color = "red";
      isvalid = false;
    }

    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (isEmpty(email)) {
      let message = document.getElementById("email_error");
      message.innerHTML = "Filed Required*";
      message.style.color = "red";
      isvalid = false;
    } else if (!email.match(validRegex)) {
      let message = document.getElementById("email_error");
      message.innerHTML = "Plz enter Valid Email format";
      message.style.color = "red";
      isvalid = false;
    }

    if (isEmpty(mobileno)) {
      let message = document.getElementById("mobile_no_error");
      message.innerHTML = "Filed Required*";
      message.style.color = "red";
      isvalid = false;
    } else if (isNaN(mobileno)) {
      let message = document.getElementById("mobile_no_error");
      message.innerHTML = "Invalid Input*";
      message.style.color = "red";
      isvalid = false;
    } else if (mobileno.length != 10) {
      // console.log(mobileno.length);
      let message = document.getElementById("mobile_no_error");
      message.innerHTML = "Invalid Mobile No*";
      message.style.color = "red";
      isvalid = false;
    }

    if (gender == undefined || gender == "") {
      let message = document.getElementById("gender_error");
      message.innerHTML = "Filed Required*";
      message.style.color = "red";
      isvalid = false;
    }

    let isValidateDate = Date.parse(dob);
    if (isEmpty(dob)) {
      let message = document.getElementById("dob_error");
      message.innerHTML = "Filed Required*";
      message.style.color = "red";
      isvalid = false;
    } else if (isNaN(isValidateDate)) {
      let message = document.getElementById("dob_error");
      message.innerHTML = "Plz enter valid*";
      message.style.color = "red";
      isvalid = false;
    }

    if (isEmpty(address)) {
      let message = document.getElementById("address_error");
      message.innerHTML = "Filed Required*";
      message.style.color = "red";
      isvalid = false;
    }

    if (isEmpty(city)) {
      let message = document.getElementById("city_error");
      message.innerHTML = "Filed Required*";
      message.style.color = "red";
      isvalid = false;
    }

    if (isEmpty(state)) {
      let message = document.getElementById("state_error");
      message.innerHTML = "Filed Required*";
      message.style.color = "red";
      isvalid = false;
    }

    if (isEmpty(zipcode)) {
      let message = document.getElementById("zipcode_error");
      message.innerHTML = "Filed Required*";
      message.style.color = "red";
      isvalid = false;
    }

    if (isEmpty(relation)) {
      let message = document.getElementById("relation_error");
      message.innerHTML = "Filed Required*";
      message.style.color = "red";
      isvalid = false;
    }
  }

  if (page === 1) {
    let degree = document.getElementsByName("degree[]");
    let board = document.getElementsByName("board[]");
    let year = document.getElementsByName("year[]");
    let percentage = document.getElementsByName("percentage[]");

    let i = 0;

    degree.forEach((e) => {
      if (e.value == "" || e.value == undefined) {
        console.log(e.value);
        let message = document.getElementById("education_error");
        message.innerHTML = "Degree Filed Required*";
        message.style.color = "red";
        isvalid = false;
      } else if (!e.value.match(letters)) {
        let message = document.getElementById("education_error");
        message.innerHTML =
          "Degree Should not contain Special Character or numbers";
        message.style.color = "red";
        isvalid = false;
      }

      if (board[i].value == "" || board[i].value == undefined) {
        let message = document.getElementById("education_error");
        message.innerHTML = "Board Filed Required*";
        message.style.color = "red";
        isvalid = false;
      } else if (!board[i].value.match(letters)) {
        let message = document.getElementById("education_error");
        message.innerHTML =
          "Board Should not contain Special Character or numbers";
        message.style.color = "red";
        isvalid = false;
      }

      let isValidateDate = new Date(year[i].value);
      //	console.log(isValidateDate);

      let datearr = year[i].value.split("/");
      //console.log(datearr.length);

      if (year[i].value == "" || year[i].value == undefined) {
        let message = document.getElementById("education_error");
        message.innerHTML = "Year Field Requird*";
        message.style.color = "red";
        isvalid = false;
      } else if (isNaN(isValidateDate)) {
        let message = document.getElementById("education_error");
        message.innerHTML = "Plz enter date in YYYY/MM/DD Format*";
        message.style.color = "red";
        isvalid = false;
      } else if (datearr.length == 1) {
        let message = document.getElementById("education_error");
        message.innerHTML = "Plz enter date in YYYY/MM/DD Format*";
        message.style.color = "red";
        isvalid = false;
      }

      if (percentage[i].value == "" || percentage[i].value == undefined) {
        let message = document.getElementById("education_error");
        message.innerHTML = "Percentage Filed Required*";
        message.style.color = "red";
        isvalid = false;
      } else if (percentage[i].value <= 0 && percentage[i].value <= 100) {
        let message = document.getElementById("education_error");
        message.innerHTML = "Enter valid Percentage*";
        message.style.color = "red";
        isvalid = false;
      }

      i++;
    });
  }

  if (page === 2) {
    let hindi_check = document.getElementById("hindi");
    let hindi_read = document.getElementById("hindiread");
    let hindi_write = document.getElementById("hindiwrite");
    let hindi_speak = document.getElementById("hindispeak");

    if (
      hindi_check.checked == true &&
      hindi_read.checked == false &&
      hindi_speak.checked == false &&
      hindi_write.checked == false
    ) {
      let message = document.getElementById("language_error");
      message.innerHTML = "Plz select Any One Option of hindi*";
      message.style.color = "red";
      isvalid = false;
    } else if (
      hindi_read.checked == true ||
      hindi_speak == true ||
      hindi_write == true
    ) {
      hindi_check.checked = true;
    }

    let gujrati_check = document.getElementById("gujrati");
    let gujrati_read = document.getElementById("gujratiread");
    let gujrati_write = document.getElementById("gujratiwrite");
    let gujrati_speak = document.getElementById("gujratispeak");

    if (
      gujrati_check.checked == true &&
      gujrati_read.checked == false &&
      gujrati_speak.checked == false &&
      gujrati_write.checked == false
    ) {
      let message = document.getElementById("language_error");
      message.innerHTML = "Plz select Any One Option of Gujrati*";
      message.style.color = "red";
      isvalid = false;
    } else if (
      gujrati_read.checked == true ||
      gujrati_speak == true ||
      gujrati_write == true
    ) {
      gujrati_check.checked = true;
    }

    let english_check = document.getElementById("english");
    let english_read = document.getElementById("englishread");
    let english_write = document.getElementById("englishwrite");
    let english_speak = document.getElementById("englishspeak");

    console.log(english_check);

    if (
      english_check.checked == true &&
      english_read.checked == false &&
      english_write.checked == false &&
      english_speak.checked == false
    ) {
      console.log("Y000");
      let message = document.getElementById("language_error");
      message.innerHTML = "Plz select Any One Option of English*";
      message.style.color = "red";
      isvalid = false;
    } else if (
      english_read.checked == true ||
      english_speak == true ||
      english_write == true
    ) {
      english_check.checked = true;
    }

    if (
      hindi_check.checked == false &&
      gujrati_check.checked &&
      false &&
      english_check.checked == false
    ) {
      let message = document.getElementById("language_error");
      message.innerHTML = "Plz Select Any One Langauge*";
      message.style.color = "red";
      isvalid = false;
    }

    let php_check = document.getElementById("php");
    let php_beginner = document.getElementById("phpbeginer");
    let php_mediator = document.getElementById("phpmediator");
    let php_expert = document.getElementById("phpexpert");

    if (
      php_check.checked == true &&
      php_beginner.checked == false &&
      php_mediator.checked == false &&
      php_expert.checked == false
    ) {
      let message = document.getElementById("language_error");
      message.innerHTML = "Select Any Option of PHP or remove check from PHP*";
      message.style.color = "red";
      isvalid = false;
    } else if (
      php_beginner.checked == true ||
      php_mediator.checked == true ||
      php_expert.checked == true
    ) {
      php_check.checked = true;
    }

    let mysql_check = document.getElementById("mysql");
    let mysql_beginner = document.getElementById("mysqlbeginer");
    let mysql_mediator = document.getElementById("mysqlmediator");
    let mysql_expert = document.getElementById("mysqlexpert");

    if (
      mysql_check.checked == true &&
      mysql_beginner.checked == false &&
      mysql_mediator.checked == false &&
      mysql_expert.checked == false
    ) {
      let message = document.getElementById("language_error");
      message.innerHTML =
        "Select Any Option of Mysql or remove check from Mysql*";
      message.style.color = "red";
      isvalid = false;
    } else if (
      mysql_beginner.checked == true ||
      mysql_mediator.checked == true ||
      mysql_expert.checked == true
    ) {
      mysql_check.checked = true;
    }

    let laravel_check = document.getElementById("laravel");
    let laravel_beginner = document.getElementById("laravelbeginer");
    let laravel_mediator = document.getElementById("laravelmediator");
    let laravel_expert = document.getElementById("laravelexpert");

    if (
      laravel_check.checked == true &&
      laravel_beginner.checked == false &&
      laravel_mediator.checked == false &&
      laravel_expert.checked == false
    ) {
      let message = document.getElementById("language_error");
      message.innerHTML =
        "Select Any Option of Laravel or remove check from laravel*";
      message.style.color = "red";
      isvalid = false;
    } else if (
      laravel_beginner.checked == true ||
      laravel_mediator.checked == true ||
      laravel_expert.checked == true
    ) {
      laravel_check.checked = true;
    }

    let oracle_check = document.getElementById("oracle");
    let oracle_beginner = document.getElementById("oraclebeginer");
    let oracle_mediator = document.getElementById("oraclemediator");
    let oracle_expert = document.getElementById("oracleexpert");

    if (
      oracle_check.checked == true &&
      oracle_beginner.checked == false &&
      oracle_mediator.checked == false &&
      oracle_expert.checked == false
    ) {
      let message = document.getElementById("language_error");
      message.innerHTML =
        "Select Any Option of Oracle or remove check from Oracle*";
      message.style.color = "red";
      isvalid = false;
    } else if (
      oracle_beginner.checked == true ||
      oracle_mediator.checked == true ||
      oracle_expert.checked == true
    ) {
      oracle_check.checked = true;
    }

    if (
      php_check.checked == false &&
      mysql_check.checked == false &&
      laravel_check.checked == false &&
      oracle_check.checked == false
    ) {
      let message = document.getElementById("language_error");
      message.innerHTML = "Select Any Technical Language*";
      message.style.color = "red";
      isvalid = false;
    }
  }

  if (page === 3) {
    let company_name = document.getElementsByName("company_name[]");
    let designation = document.getElementsByName("designation[]");
    let start_date = document.getElementsByName("start_date[]");
    let end_date = document.getElementsByName("end_date[]");

    let i = 0;

    company_name.forEach((e) => {
      if (e.value == "" || e.value == undefined) {
        console.log(e.value);
        let message = document.getElementById("work_error");
        message.innerHTML = "Company Name Filed Required*";
        message.style.color = "red";
        isvalid = false;
      } else if (!e.value.match(letters)) {
        let message = document.getElementById("work_error");
        message.innerHTML =
          "Company Name Should not contain Special Character or numbers";
        message.style.color = "red";
        isvalid = false;
      }

      if (designation[i].value == "" || designation[i].value == undefined) {
        let message = document.getElementById("work_error");
        message.innerHTML = "designation Filed Required*";
        message.style.color = "red";
        isvalid = false;
      } else if (!designation[i].value.match(letters)) {
        let message = document.getElementById("work_error");
        message.innerHTML =
          "designation Should not contain Special Character or numbers";
        message.style.color = "red";
        isvalid = false;
      }

      let isValidateDate1 = new Date(start_date[i].value);
      let isValidateDate2 = new Date(end_date[i].value);

      //	console.log(isValidateDate);

      let datearr1 = start_date[i].value.split("/");
      let datearr2 = end_date[i].value.split("/");

      //console.log(datearr.length);

      if (start_date[i].value == "" || start_date[i].value == undefined) {
        let message = document.getElementById("work_error");
        message.innerHTML = "Year Field Requird*";
        message.style.color = "red";
        isvalid = false;
      } else if (isNaN(isValidateDate1)) {
        let message = document.getElementById("work_error");
        message.innerHTML = "Plz enter date in YYYY/MM/DD Format*";
        message.style.color = "red";
        isvalid = false;
      } else if (datearr1.length == 1) {
        let message = document.getElementById("work_error");
        message.innerHTML = "Plz enter date in YYYY/MM/DD Format*";
        message.style.color = "red";
        isvalid = false;
      }

      if (end_date[i].value == "" || end_date[i].value == undefined) {
        let message = document.getElementById("work_error");
        message.innerHTML = "Year Field Requird*";
        message.style.color = "red";
        isvalid = false;
      } else if (isNaN(isValidateDate2)) {
        let message = document.getElementById("work_error");
        message.innerHTML = "Plz enter date in YYYY/MM/DD Format*";
        message.style.color = "red";
        isvalid = false;
      } else if (datearr2.length == 1) {
        let message = document.getElementById("work_error");
        message.innerHTML = "Plz enter date in YYYY/MM/DD Format*";
        message.style.color = "red";
        isvalid = false;
      }

      i++;
    });
  }

  if (page == 5) {
    let name = document.forms["form"]["name"].value;
    let contactno = document.forms["form"]["contactno"].value;
    let relationship = document.forms["form"]["relationship"].value;

    console.log(contactno);

    if (isEmpty(name)) {
      let message = document.getElementById("refrence_error");
      message.innerHTML = "Filed Required*";
      message.style.color = "red";
      isvalid = false;
    } else if (!name.match(letters)) {
      let message = document.getElementById("refrence_error");
      message.innerHTML =
        "Refer Name  Should not contain Special Character or numbers";
      message.style.color = "red";
      isvalid = false;
    }

    if (isEmpty(contactno)) {
      let message = document.getElementById("refrence_error");
      message.innerHTML = "Filed Required*";
      message.style.color = "red";
      isvalid = false;
    } else if (isNaN(contactno)) {
      let message = document.getElementById("refrence_error");
      message.innerHTML = "Invalid Input*";
      message.style.color = "red";
      isvalid = false;
    } else if (contactno.length != 10) {
      let message = document.getElementById("refrence_error");
      message.innerHTML = "Invalid Mobile No*";
      message.style.color = "red";
      isvalid = false;
    }

    if (isEmpty(relationship)) {
      let message = document.getElementById("refrence_error");
      message.innerHTML = "Filed Required*";
      message.style.color = "red";
      isvalid = false;
    } else if (!relationship.match(letters)) {
      let message = document.getElementById("refrence_error");
      message.innerHTML =
        "Refer Relationship Should not contain Special Character or numbers";
      message.style.color = "red";
      isvalid = false;
    }
  }

  if (page == 6) {
    let location = document.forms["form"]["location"].value;
    let noticeperiod = document.forms["form"]["noticeperiod"].value;
    let expacted_ctc = document.forms["form"]["expacted_ctc"].value;
    let current_ctc = document.forms["form"]["current_ctc"].value;
    let department = document.forms["form"]["department"].value;

    if (isEmpty(location)) {
      let message = document.getElementById("preferences_error");
      message.innerHTML = "Filed Required*";
      message.style.color = "red";
      isvalid = false;
    }

    if (isEmpty(noticeperiod)) {
      let message = document.getElementById("preferences_error");
      message.innerHTML = "Filed Required*";
      message.style.color = "red";
      isvalid = false;
    } else if (isNaN(noticeperiod)) {
      let message = document.getElementById("preferences_error");
      message.innerHTML = "Invalid Input*";
      message.style.color = "red";
      isvalid = false;
    }

    if (isEmpty(expacted_ctc)) {
      let message = document.getElementById("preferences_error");
      message.innerHTML = "Filed Required*";
      message.style.color = "red";
      isvalid = false;
    } else if (isNaN(expacted_ctc)) {
      let message = document.getElementById("preferences_error");
      message.innerHTML = "Invalid Input*";
      message.style.color = "red";
      isvalid = false;
    }

    if (isEmpty(current_ctc)) {
      let message = document.getElementById("preferences_error");
      message.innerHTML = "Filed Required*";
      message.style.color = "red";
      isvalid = false;
    } else if (isNaN(current_ctc)) {
      let message = document.getElementById("preferences_error");
      message.innerHTML = "Invalid Input*";
      message.style.color = "red";
      isvalid = false;
    }

    if (isEmpty(department)) {
      let message = document.getElementById("preferences_error");
      message.innerHTML = "Filed Required*";
      message.style.color = "red";
      isvalid = false;
    }
  }

  return isvalid;
}

async function submitdata() {
  let data = document.getElementById("form");
  let formdata = new FormData(data);
  console.log(formdata);

  let params = new URLSearchParams(formdata);

  console.log(params);

  let result1 = await fetch("http://localhost:3000/api/user/jobForm/store", {
    method: "POST",

    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  result1 = await result1.json();

  window.location.href = '/api/user/jobForm/employees'
}

async function updatedata() {
  let data = document.getElementById("form");
  let formdata = new FormData(data);
  console.log(formdata);

  let params = new URLSearchParams(formdata);

  console.log(params);

  let result1 = await fetch(
    "http://localhost:3000/api/user/jobForm/updateEmployee",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    }
  );

  result1 = await result1.json();

  window.location.href = '/api/user/jobForm/employees'
}
