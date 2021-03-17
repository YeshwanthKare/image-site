window.onload = () => {
    dropDown();
    imageFetch();
    // fetchUnsplash()
    searchParameters();
}

const dropDown = () => {

    dropDownButtons (".explore-btn", ".explore_dropdown")
    dropDownButtons (".menu-bar", ".explore_dropdown")
    
}

const dropDownButtons = (button_selector, dropdown_selector) => {
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

function imageFetch() {
    let key = config.MY_KEY;
    return fetch(`https://pixabay.com/api/?key=${key}&image_type=all`)
    // &q=all&image_type=all
    .then((response) => {
        if(response.ok) {
            return response.json();
        }else {
            throw new Error("Something went wrong");
        }
    })
    .then((data) =>{
        showImage(data.hits);
        console.log(data.hits)
    })
}

// fetchUnsplash = () => {
//     fetch()
//     .then((res) => {
//         return res.json();
//     })
//     .then((data) => {
//         console.log(data);
//         showImage(data);
//     })
// }

const individualImageFetch = (e) => {
    let id = e.target.getAttribute("data-id");
    window.location.href = `../pages/individual-image.html?id=${id}`
    console.log(id);
}

const showImage = (images) => {
    wrapperSelector(images, ".wrapper");
    

}


const fetchImagesByType = (e) => {
    const element = e.target.getElementsByClassName('button');
    console.log(element);
}



const searchParameters = () => {
    let query = document.querySelector("#Search");
    console.log(query);
    let selectTag = document.querySelector("#option");
    let options = selectTag.options;
    let button = document.getElementById("search_submit");
    button.classList.add('button')
    // if(button.clicked = true) {
    //     window.location.href = `../pages/search.html`
    // }

    button.addEventListener("click", (e) => {
        e.preventDefault()
        fetchImagesByType(e);
        for(let option of options) {
            console.log(option.value)
            if(option.value == 'image'){
                // window.location.href = `../pages/search.html?q=${query}&type=${option.value}`;
            }else if(option.value == 'photo'){
                // window.location.href =`../pages/search.html?q=${query}&type=${option.value}`;
            }else if(option.value == 'vector') {
                // window.location.href =`../pages/search.html?q=${query}&type=${option.value}`;
            }else{
                // window.location.href =`../pages/search.html?q=${query}&type=${option.value}`;
            }
        }
    })

}







const wrapperSelector = (images, wrapper_selector) => {
    var imageEl = document.querySelector(wrapper_selector);
    for(let image of images){

        let imageElement = document.createElement("div");
        imageElement.classList.add("image");

        let img = document.createElement("img");
        img.src = image.webformatURL;
        img.setAttribute("data-id", image.id);

        img.addEventListener("click", (e) => {
            individualImageFetch(e);
            
            
        })

        let authorContainer = document.createElement("div");
        authorContainer.classList.add("author_container");

        let author = document.createElement("div");
        author.classList.add("author");
        author.innerHTML = image.user;

        let votes = document.createElement("div");
        votes.classList.add("votes");

        let comments = document.createElement("div");
        comments.classList.add("comment");
        comments.innerHTML = `
           <span id="comment">${image.comments} <a href="#"><i class="far fa-comment"></i></a></span>
        `

        let like = document.createElement("div");
        like.classList.add("like");
        like.innerHTML = `
           <span id="like"> ${image.likes} <a href="#"><i class="far fa-heart"></i></a></span>
        `

        let favorites = document.createElement("div");
        favorites.classList.add("favourite");
        favorites.innerHTML = `
            <span id="favourite">${image.favorites} <a href="#"><i class="far fa-star"></i></a></span>
        `

        votes.appendChild(comments);
        votes.appendChild(like);
        votes.appendChild(favorites);

        authorContainer.appendChild(author)
        authorContainer.appendChild(votes);

        imageElement.appendChild(img);
        imageElement.appendChild(authorContainer);

        imageEl.appendChild(imageElement)

    }
}



   
