
    function changerows(val) {

        if (val > 0) {
            let workgroup = document.getElementsByClassName('workexperience')[0];
            let container = document.getElementsByClassName('workexpclone')[0];
            let clone = workgroup.cloneNode(true);

            container.appendChild(clone);
        }

        if (val < 0) {
            let container = document.getElementsByClassName('workexpclone');
            // console.log(container);
            let workgroups = document.getElementsByClassName('workexperience');
            // console.log(workgroups.length);

            if (workgroups.length > 1) {
                container[0].removeChild(container[0].lastElementChild);
            } else {
                return 0;
            }
        }
    }

