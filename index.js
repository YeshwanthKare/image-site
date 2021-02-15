window.onload = () => {
    dropDown();
    imageFetch();
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

imageFetch = () => {
    let image = fetch("https://pixabay.com/api/?key=19669519-a64bb35ec2ecb1a51d76889be&image_type=vectors");
    image.then((response) => {
        return response.json();
    })
    .then((data) =>{
        addImage(data.hits);
        console.log(data.hits)
    })
}

addImage = (images) => {
    var imageEl = document.querySelector(".images_container");
    for(let image of images){
        imageEl.innerHTML += `

            <img src="${image.webformatURL}" alt="">
        ` 
    } 
}
