function checktimeout(){
    let timer = Number(document.getElementById('timer').innerHTML);

    let counter = setInterval(countime, 1000);

    let curr = document.getElementById('timer');

    function countime(){
        if(timer >= 30){
            removeAccesscode()
            clearInterval(counter);
        }else{
            timer++;
            curr.innerHTML = timer;
        }
    }

}

async function removeAccesscode(){
    let accesslink = document.getElementById('accesslink');
    accesslink.href = "/api/user/error";

    let accesscode = document.getElementById('accesscode').value;       
    console.log(accesscode);

    let obj = {accesscode : accesscode};

    let params = new URLSearchParams(obj);

    let check_user = await fetch("http://localhost:3000/api/user/removeAccess", {
        method:"POST",
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
        },
        body:params
    })

    let data = await check_user.json();
    console.log(data);
}