function isEmpty(val){
    return (val === undefined || val === null || val === 0 || val.length === 0 || val <= 0) ? true : false;
}

function validateRegister(){

    let isValid = true;
    let letters = /[A-Za-z]/;
    let validRegex = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/;

    let username = document.forms['form']['username'].value;
    let email = document.forms['form']['email'].value;
    let mobileno = document.forms['form']['mobileno'].value;
    let dob = document.forms['form']['dob'].value;
    let address = document.forms['form']['address'].value;
    let country = document.forms['form']['country'].value;

    if(isEmpty(username)){
        let msg = document.getElementById('user_error');
        msg.innerHTML = "Plz Enter UserName";
        isValid = false;
    }else if(!username.match(letters)){
        let msg = document.getElementById('user_error');
        msg.innerHTML = "UserName should not contain Special Character or Number";
        isValid = false;
    }else if(username.length <= 2){
        let msg = document.getElementById('user_error');
        msg.innerHTML = "UserName Length Should be greater than 2";
        isValid = false;
    }

    if(isEmpty(email)){
        let msg = document.getElementById('email_error');
        msg.innerHTML = "Plz Enter Email";
        isValid = false;
    }else if(!email.match(validRegex)){
        let msg = document.getElementById('email_error');
        msg.innerHTML = "Plz Enter Valid Email Id";
        isValid = false;
    }

    if(isEmpty(mobileno)){
        let msg = document.getElementById('mobileno_error');
        msg.innerHTML = "Plz Enter Mobile No";
        isValid = false;
    }else if(isNaN(mobileno)){
        let msg = document.getElementById('mobileno_error');
        msg.innerHTML = "Mobile No should Contain digits only";
        isValid = false;
    }else if(mobileno.length != 10){
        let msg = document.getElementById('mobileno_error');
        msg.innerHTML = "Plz Enter Valid Mobile No";
        isValid = false;
    }

    let validatedob = new Date(dob);
    let arr = dob.split("/");

    if(isEmpty(dob)){
        let msg = document.getElementById('dob_error');
        msg.innerHTML = "Plz Enter Date Of Birth";
        isValid = false;
    }else if(isNaN(validatedob)){
        let msg = document.getElementById('dob_error');
        msg.innerHTML = "Plz Enter Valid Date Of Birth";
        isValid = false;
    }else if(arr.length === 1){
        let msg = document.getElementById('dob_error');
        msg.innerHTML = "Plz Enter Date Of Birth in YYYY/MM/DD Format";
        isValid = false;
    }

    if(isEmpty(address)){
        let msg = document.getElementById('address_error');
        msg.innerHTML = "Plz Enter Address";
        isValid = false;
    }

    if(isEmpty(country)){
        let msg = document.getElementById('country_error');
        msg.innerHTML = "Plz Enter Country";
        isValid = false;
    }

    return isValid;

}