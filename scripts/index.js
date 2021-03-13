window.onload = () => {
    dropDown();
    imageFetch();
}

const dropDown = () => {

    dropDownButtons (".explore-btn", ".explore_dropdown")
    dropDownButtons (".menu-bar", ".explore_dropdown")
    // dropDownButtons(".user_profile_pic", ".user_profile_dropdown")
}

function dropDownButtons (button_selector, dropdown_selector) {
    let button = document.querySelector(button_selector);
    let dropdown = document.querySelector(dropdown_selector);

    button.addEventListener("click", () => {
        if(dropdown.style.display === ""){
            dropdown.style.display = "block";
        }else {
            dropdown.style.display = "";
        }
    })

    button.addEventListener("focusout", () => {
        setTimeout(() => {
            dropdown.style.display = "";
        },100)
    })
}

async function imageFetch() {
    let key = config.MY_KEY;
    return await fetch(`https://pixabay.com/api/?key=${key}`)
    // &q=all&image_type=all
    .then((response) => {
        return response.json();
    })
    .then((data) =>{
        showImage(data.hits);
        console.log(data)
    })
}

const showImage = (images) => {
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



   
