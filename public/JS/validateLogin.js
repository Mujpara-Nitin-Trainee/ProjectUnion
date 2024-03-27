function isEmpty(val){
    return (val === undefined || val === null || val === 0 || val.length === 0 || val <= 0) ? true : false;
}

function validateLogin(){
    let isValid = true;

    let validRegex = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/;

    let email = document.forms['form']['email'].value;
    let password = document.forms['form']['password'].value;

    if(isEmpty(email)){
        let msg = document.getElementById('email_error');
        msg.innerHTML = "Plz Enter Email";
        isValid = false;
    }else if(!email.match(validRegex)){
        let msg = document.getElementById('email_error');
        msg.innerHTML = "Plz Enter Valid Email Id";
        isValid = false;
    }

    if(isEmpty(password)){
        let msg = document.getElementById('pass1');
        msg.innerHTML = "Plz Enter Password*";
        isValid = false;
    }

    return isValid;

}

function validateEmail(){
    let isValid = true;

    let validRegex = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/;

    let email = document.forms['form']['email'].value;

    if(isEmpty(email)){
        let msg = document.getElementById('email_error');
        msg.innerHTML = "Plz Enter Email";
        isValid = false;
    }else if(!email.match(validRegex)){
        let msg = document.getElementById('email_error');
        msg.innerHTML = "Plz Enter Valid Email Id";
        isValid = false;
    }

    return isValid;
}