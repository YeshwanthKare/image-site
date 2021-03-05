window.onload = () => {
    dropDown();
    imageFetch();
    // imageDrop();
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
            // dropdown.style.display = '';
            menuContent.style.display = '';
            barMenuContent.style.display = '';
        },100)
                    
    });
}

imageFetch = () => {
    let key = config.MY_KEY;
    let image = fetch(`https://pixabay.com/api/?key=${key}&q=all&image_type=all`);
    image.then((response) => {
        return response.json();
    })
    .then((data) =>{
        addImage(data.hits);
        console.log(data.hits)
    })
}

addImage = (images) => {
    var imageEl = document.querySelector(".wrapper");
    for(let image of images){
        imageEl.innerHTML += `
            <div class="image">
                <img src="${image.webformatURL}" alt="">
                <div class="author_container">
                    <div id="author">${image.user}</div>
                    <div class="votes">
                        <div class="comment">
                            <span id="comment">${image.comments} <a href="#"><i class="far fa-comment"></i></a></span>
                        </div>
                        <div class="like">
                            <span id="like"> ${image.likes} <a href="#"><i class="far fa-heart"></i></a></span>
                        </div>
                        <div class="favourite">
                            <span id="favourite">${image.favorites} <a href="#"><i class="far fa-star"></i></a></span>
                        </div>
                        
                    </div>
                </div>
            </div>
                        
        ` 
    } 
}
