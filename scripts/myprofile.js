window.onload = () => {
    dropDown();
    userImageFetch();
    searchImages();
    
}


const getPostIdParams = () => {
    const id = Header.get("_id")
    console.log(id)
    const queryString = window.location.search;
    console.log(queryString)
    const urlParams = new URLSearchParams(queryString);
    console.log(urlParams)
    return urlParams.get('id');
    console.log(urlParams.get('_id'))
}



let API = `http://localhost:3002/users/image`
let API_BASE_URL = `http://localhost:3002/`;


const userImageFetch = () => {
    // let key = config.MY_KEY;
    let url = `${API}`
    let image = fetch(url, {
        method: "GET",
    });
    image.then((response) => {
        return response.json();
    })
    .then((data) =>{
        addUserImages(data);
        console.log(data)
    })
    .catch((err) => {
        console.log(err)
    })
}

// addImage = (images) => {
//     wrapperSelector(images, ".photo_wrapper")
// }

const addUserImages = (images) => {
    var imageEl = document.querySelector(".myprofile_images_wrapper");
    var uploadedImage = "";
    for (const img of images) {
        
        let postImage = API_BASE_URL + img.image;
        console.log(postImage)
        console.log(images)
        uploadedImage += `
            <div class="image">
                <img src="${postImage}" alt="">
                <div>
                    <p id="name">${img.name}</p>
                    <p id="tag">${img.tags}</p>
                </div>    
            </div>                        
        `
    }

    imageEl.innerHTML = uploadedImage;
     
}


searchImages = () => {
    searchParameters("#register_option", "search_submit", "#register_Search")
}

