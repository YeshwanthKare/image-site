window.onload = () => {
    dropDown();
}

function dropDown (){
    let dropdownBtn = document.querySelector('.explore-btn');
    let menuContent = document.querySelector('.explore_dropdown');
    dropdownBtn.addEventListener('click',()=>{
        if(menuContent.style.display===""){
            menuContent.style.display="block";
        } else {
            menuContent.style.display="";
        }
    });
    dropdownBtn.addEventListener('focusout', () => {
        setTimeout(function(){
            menuContent.style.display = '';
        }, 100);
    });

                // let dropDown = document.getElementsByClassName("explore_dropdown");
                // for(let i = 0; i < dropDown.length;i++){
                //     document.getElementsByClassName("menu-bar")[0].append(dropDown[i]);
                // }

    let barDropdownBtn = document.querySelector('.menu-bar');
    let barMenuContent = document.querySelector(".explore_dropdown");
    barDropdownBtn.addEventListener('click', ()=> {
        if(barMenuContent.style.display===""){
            barMenuContent.style.display="block";
        } else {
            barMenuContent.style.display="";
        }
    });
    barDropdownBtn.addEventListener('focusout', () => {
        setTimeout(function() {
            menuContent.style.display = '';
            barMenuContent.style.display = '';
        },100)
                    
    });
}
// dropDown();
