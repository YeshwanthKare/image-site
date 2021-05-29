window.onload = () => {
    searchImages()
    getIndividualImage();
    dropDown()
    settingsFetch()
    removingLogin();
    userSettingFetch();
    removeImage()
    
}

const getPostIdParam = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('id');
}

// console.log(getPostIdParam())




function getIndividualImage() {
    const my_key = config.MY_KEY;
    let myUrl = ``;

    if(getPostIdParam().length <= 7){
        myUrl = `https://pixabay.com/api/?key=${my_key}&id=${getPostIdParam()}`
    }else{
        myUrl = `http://localhost:3002/users/image/${getPostIdParam()}`
    }

    if(myUrl){
        fetch(myUrl, {
            method: 'GET',
        })
        .then(res => {
            return res.json();
        }) 
        .then((data)=>{
            if(data.hits){
                showIndividualImage(data.hits[0])
            }else {            
                showUserImages(data)
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
}


// API Images Fetch

const showIndividualImage = (image) => {
    console.log(image)
    // console.log(image.user)
    let container = document.querySelector(".individual_image_container");
    let imageElem = document.createElement('img');
    let divEl = document.createElement("div");
    divEl.setAttribute("class", "image-elem")

    let user = document.createElement("div");
    user.setAttribute("class", "user-attributes");

    let userName = document.createElement("p");
    userName.setAttribute("class", "user-name");
    userName.innerText = image.user;

    let userTags = document.createElement("p");
    userTags.setAttribute("class", "user-tags");
    userTags.innerText = image.tags

    console.log(userTags)

    
  
    imageElem.src = image.fullHDURL;

    document.querySelector(".profile_image").style.backgroundImage = `url(${image.userImageURL})`;
    document.querySelector(".profile_name").innerText = image.user
    document.querySelector(".individual_like").innerHTML = `<i class="far fa-heart"></i>  <span>${image.likes}</span>`
    document.querySelector(".individual_favorite").innerHTML = `<i class="far fa-star"></i>  <span>${image.favorites}</span>`
    document.querySelector(".image_comments").innerHTML = `<button>${image.comments}  comments</button>`
    

    user.appendChild(userName);
    user.appendChild(userTags);
                    
    divEl.appendChild(user)    

    divEl.appendChild(imageElem)
    container.appendChild(divEl);
    console.log(container)

    // downloadable images

    document.querySelector(".individual_delete").style.display = 'none'
    // document.querySelector(".profile-navigate").style.display = 'none'
    document.querySelector(".download-image").style.justifyContent = 'flex-end'

    let downloadContainer = document.querySelector(".picture-size");
    console.log(downloadContainer)

    let ulList = `
            <ul>
                <li class="small-image">
                    <a href="${image.previewURL}" download="${image.tags[0]}" target="_blank">
                        150px 
                    </a>
                </li>
                <hr>
                <li class="medium-image">
                    <a href="${image.imageURL}" download="${image.tags[0]}" target="_blank">
                        640px
                    </a>
                </li>
                <hr>
                <li class="large-image">
                    <a href="${image.largeImageURL}" download="${image.tags[0]}" target="_blank">
                        1280px
                    </a>
                </li>
                <hr>
                <li class="hd-image">
                    <a href="${image.fullHDURL}" download="${image.tags[0]}" target="_blank">
                        1920px
                    </a>
                </li>
            </ul>`

            // console.log(ulList)

    downloadContainer.innerHTML = ulList

}



// User Settings and Images fetch


const settingsFetch =  () => {
    const settingUrl = `http://localhost:3002/users/settings`;
    return fetch(settingUrl, {
        method: "GET"
    })
    .then((res) => {
        return res.json()
    })
}


const showUserImages = (img) => {
    console.log(img)

    const url = `http://localhost:3002/`
    let container = document.querySelector(".individual_image_container");
    let imageElem = document.createElement('img');
    let divEl = document.createElement("div");
    divEl.setAttribute("class", "image-elem");

    let userImage = url + img.image
    imageElem.src = userImage;
    imageElem.setAttribute("id", "image-source")

    let user = document.createElement("div");
    user.setAttribute("class", "user-attributes");

    let userName = document.createElement("p");
    userName.setAttribute("class", "user-name");
    // userName.value = img.username;

    let userTags = document.createElement("p");
    userTags.setAttribute("class", "user-tags");
    userTags.innerText = img.tags

    console.log(userTags)

    
    user.appendChild(userName);
    user.appendChild(userTags);
                    
    divEl.appendChild(user)

    divEl.appendChild(imageElem)
    container.appendChild(divEl);
    // console.log(container)


    let settings = settingsFetch();
    settings
    .then(pics => {
        console.log(pics)
        for (const pic of pics) {
            if(token === pic.user_id){
                document.getElementById("profile-image").style.backgroundImage = `url(${url}${pic.profileImage})` 
                document.querySelector(".profile_name").innerText = pic.username
                document.querySelector(".user-name").innerText = pic.username
            }
        }
        }
    )


    let downloadContainer = document.querySelector(".picture-size");
    // console.log(downloadContainer)

    let ulList = `
            <ul>
                <li class="small-image">
                    <a href="${userImage}" download="${img.tags}" target="_blank">
                        View Image
                    </a>
                </li>
            </ul>`

            // console.log(ulList)

    downloadContainer.innerHTML = ulList
    document.querySelector(".individual_delete").style.display = "block"
    document.querySelector(".individual_like").style.display = 'none'
    document.querySelector(".individual_favorite").style.display = 'none'
    document.querySelector(".image_button").style.justifyContent = 'flex-end'
    // document.querySelector(".image_button").style.backgroundColor = 'transparent'

}


// Deleting images 

const removeImage = () => {
    

    let deleteButton = document.querySelector(".individual_delete")
    let previewButton = document.querySelector(".img-dwnld")

    
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    // var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    deleteButton.onclick = function() {
    modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    let No = document.querySelector(".no")

    No.onclick = () => {
        modal.style.display = "none"
    }

    let confirmDeleteButton = document.querySelector(".yes")

    confirmDeleteButton.addEventListener("click", (e) => {
        e.preventDefault()
        const imageId = getPostIdParam()
        console.log("image id is: ", imageId)

        fetch(`http://localhost:3002/users/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                imageId
            })
        })
        .then((res) => {
            return res.text()
            
        })
        .then((res) => {
            console.log(res)
            location.href = `/pages/myprofile.html`
        })
        .catch((err) => {
            console.log(err)
        })
    })

    
}





// Images Search 

searchImages = () => {
    searchParameters("#register_option", "search_submit", "#register_Search")
}