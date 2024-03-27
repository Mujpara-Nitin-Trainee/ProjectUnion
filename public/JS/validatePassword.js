function isEmpty(val){
    return (val === undefined || val === null || val === 0 || val.length <= 0 || val == "") ? true : false;
}

function validatePassword(){

    let isvalid = true;

    let accesscode = document.forms['form']['accesscode'].value;
    let password = document.forms['form']['password'].value;
    let rpassword = document.forms['form']['rpassword'].value;

    if(isEmpty(accesscode)){
        let msg = document.getElementById('token');
        msg.innerHTML = "The Token Has been Experied*";
        isvalid = false;
    }

    if(isEmpty(password)){
        let msg = document.getElementById('pass1');
        msg.innerHTML = "Plz Enter Password*";
        isvalid = false;
    }

    if(isEmpty(rpassword)){
        let msg = document.getElementById('pass2');
        msg.innerHTML = "Plz Re-Enter Password*";
        isvalid = false;
    }

    if(password === rpassword){
        let msg = document.getElementById('error');
        msg.innerHTML = "Passwords Doesn't Matching";
        isvalid = false;
    }

    return isvalid;
}