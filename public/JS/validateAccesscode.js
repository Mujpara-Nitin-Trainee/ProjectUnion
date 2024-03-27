function checktimeout(){
    let timer = Number(document.getElementById('timer').innerHTML);

    let counter=setInterval(counttime,1000)

    let curr = document.getElementById('timer');
    
    function counttime(){
        if(timer >= 30){
            // console.log("hii")
            removeUser();

            clearInterval(counter);
        }else{
            timer++;
            curr.innerHTML = timer;

        }
       

    }
 
}

async function removeUser(){

    let accesslink = document.getElementById('accesslink');
    accesslink.href = "/api/user/error";

    let accesscode = document.getElementById('accesscode').value;       
    console.log(accesscode);

    let obj = {accesscode : accesscode};

    let params = new URLSearchParams(obj);

    let check_user = await fetch("http://localhost:3000/api/user/check", {
        method:"POST",
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
        },
        body:params
    })

    let data = await check_user.json();
    // console.log(data[0].password == null);

    if(data[0].password == null){
        let result = await fetch("http://localhost:3000/api/user/remove", {
        method:"POST",
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
        },
        body:params
    })

        response = await result.json();
        // console.log(response);
        window.location.href = "/api/user/"
    }

    

}