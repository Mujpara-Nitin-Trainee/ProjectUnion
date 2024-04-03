const {pageDelimiterSearchService} = require("../../services/paggingService");

const pageDelimiterSearch = async(req,res) => {
    try{

        const data = req.body.search;

        let values = [];
        let i = 0;
        for(let j=1; j <= data.length; j++){
            
            if((data.charAt(i) == '_' || data.charAt(i) == '^' || data.charAt(i) == '$' || 
                data.charAt(i) == '}' || data.charAt(i) == '{' || data.charAt(i) == '#') && 
                (data.charAt(j) == '_' || data.charAt(j) == '^' || data.charAt(j) == '$' || 
                data.charAt(j) == '}' || data.charAt(j) == '{' || data.charAt(j) == '#')){

                let answer = data.substring(i,j);
                values.push(answer);
                i = j;
            
            }else if((data.charAt(i) == '_' || data.charAt(i) == '^' || data.charAt(i) == '$' || 
            data.charAt(i) == '}' || data.charAt(i) == '{' || data.charAt(i) == '#') && j == data.length){
                let answer = data.substring(i,j);
                values.push(answer);
                i = j;
            }
        }

        let firstname = [];
        let lastname = [];
        let email = [];
        let age = [];
        let gender = [];
        let mobileno = [];

        for(let k=0; k < values.length ; k++){

            if(values[k].charAt(0) == '_'){
                firstname.push(`name LIKE '%${values[k].slice(1)}%'`); 
            }else if(values[k].charAt(0) == '^'){
                lastname.push(`surname LIKE '%${values[k].slice(1)}%'`);
            }else if(values[k].charAt(0) == '$'){
                email.push(`email LIKE '%${values[k].slice(1)}%'`);
            }else if(values[k].charAt(0) == '}'){
                age.push(values[k].slice(1));
            }else if(values[k].charAt(0) == '{'){
                gender.push(values[k].slice(1));
            }else if(values[k].charAt(0) == '#'){
                mobileno.push(`mobile_no LIKE '%${values[k].slice(1)}%'`);
            }
        }

        if(firstname.length > 0) { firstname.join("or") }
        if(lastname.length > 0) { lastname.join("or") }
        if(email.length > 0) { email.join("or") }
        if(age.length > 0) { age.join("or") }
        if(gender.length > 0) { gender.join("or") }
        if(mobileno.length > 0) { mobileno.join("or") }

        function isEmpty(val) {
            return (val === null || val === "" || val === "undefined" || val.length <= 0 || val === 0) ? true : false;
        }
        if(isEmpty(firstname)){
            firstname.push(`firstname LIKE '%'`);
        }
        if(isEmpty(lastname)){
            lastname.push(`surname LIKE '%'`);
        }
        if(isEmpty(mobileno)){
            mobileno.push(`mobile_no LIKE '%'`);
        }
        if(isEmpty(email)){
            email.push(`email LIKE '%'`)
        }

        // console.log(firstname + " " + lastname + " " + email + " " + mobileno);

        const [response] = await pageDelimiterSearchService(firstname,lastname,email,mobileno);

        // console.log(response);

        if(response.length > 0){
            res.render('delimiterSearch',{student:response,rows:Object.keys(response[0])});
        }else{
            res.render('delimiterSearch',{student:response, rows:0});
        }


    }catch(err){
        console.log(err);
    }
}

module.exports = {pageDelimiterSearch};