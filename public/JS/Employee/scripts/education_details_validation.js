
    let cnt = 0;
    function changeeducation(val) {
        console.log(cnt);

        if (val > 0 && cnt < 3) {
            let educationgroup = document.getElementsByClassName('education')[0];
            console.log(educationgroup);
            let container = document.getElementsByClassName('cloneducation')[0];
            let clone = educationgroup.cloneNode(true);

            container.appendChild(clone);
            cnt++;
        }

        if (val < 0) {
            let container = document.getElementsByClassName('cloneducation');
            // console.log(container);
            let educationgroups = document.getElementsByClassName('education');
            // console.log(workgroups.length);

            if (educationgroups.length > 1) {
                container[0].removeChild(container[0].lastElementChild);
            } else {
                return 0;
            }
        }
    }
