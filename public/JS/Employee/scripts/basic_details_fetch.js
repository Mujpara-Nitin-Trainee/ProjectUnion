
    function loadcities(value) {
        // console.log(value);
        const xhttp = new XMLHttpRequest();
        xhttp.getResponseHeader("content-type", "application/json");

        xhttp.open("GET", `http://localhost:3000/api/user/jobForm/cities?state=${value}`, true)
        xhttp.send();

        xhttp.onload = function () {
            let select = document.getElementById("city");
            select.innerHTML = null;

            let option = document.createElement('option');
            option.innerHTML = "Select Any City";
            select.appendChild(option);

            const response = JSON.parse(this.responseText);
            // console.log(response);
            
            for (let i = 0; i < response.length; i++) {

                let option = document.createElement('option');
                // option.setAttribute('value',response[i].city_name);
                option.value = response[i].city_name;
                option.innerText = response[i].city_name;
                select.appendChild(option);
                // console.log(response[i].city_name);
            }
        }

    }

    function nextmodule(val){
        console.log("Calling");

        let path = val || "education_details";

        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", `./components/${path}.ejs`, true);
        xhttp.send();

        xhttp.onreadystatechange = function(){
            if(xhttp.readyState == 4 && xhttp.status == 200){
                document.getElementById('change').innerHTML = xhttp.response;
            }
        }

    }

    function prevmodule(){
        console.log("Previous");

        let xhttp = new XMLHttpRequest();
        xhttp.open("GET","",true);
        xhttp.send();

        xhttp.onreadystatechange = function(){
            if(xhttp.readyState == 4 && xhttp.status == 200){
                document.getElementById('change').innerHTML = xhttp.response;
            }
        }

    }
