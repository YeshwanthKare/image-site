window.onload = () => {
    searchImages()
    getIndividualImage();
    dropDown()
    settingsFetch()
    removingLogin();
    userSettingFetch();
    
    // console.log(userSettingFetch())
    // settingsFetch();
}

const getPostIdParam = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('id');
}

console.log(getPostIdParam())

// console.log(userSettingFetch())


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

const showIndividualImage = (image) => {
    console.log(image)
    console.log(image.user)
    let container = document.querySelector(".individual_image_container");
    let imageElem = document.createElement('img');
    let divEl = document.createElement("div");
    divEl.setAttribute("class", "image-elem")
    // console.log(divEl)
    // imageElem.src = image.largeImageURL;
    imageElem.src = image.fullHDURL;
    // imageElem.setAttribute("id", "image-source);

    document.querySelector(".profile_image").style.backgroundImage = `url(${image.userImageURL})`;
    document.querySelector(".profile_name").innerText = image.user
    document.querySelector(".individual_like").innerHTML = `<i class="far fa-heart"></i>  <span>${image.likes}</span>`
    document.querySelector(".individual_favorite").innerHTML = `<i class="far fa-star"></i>  <span>${image.favorites}</span>`
    document.querySelector(".image_comments").innerHTML = `<button>${image.comments}  comments</button>`
    

    divEl.appendChild(imageElem)
    container.appendChild(divEl);
    console.log(container)

    // downloadable images

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

            console.log(ulList)

    downloadContainer.innerHTML = ulList

}

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

    let settings = settingsFetch();
    settings
    .then(pics => {
        console.log(pics)
        for (const pic of pics) {
            if(token === pic.user_id){
                document.getElementById("profile-image").style.backgroundImage = `url(${url}${pic.profileImage})` 
                document.querySelector(".profile_name").innerText = pic.username

            }
        }
        }
    )

    const url = `http://localhost:3002/`
    let container = document.querySelector(".individual_image_container");
    let imageElem = document.createElement('img');
    let divEl = document.createElement("div");
    divEl.setAttribute("class", "image-elem")    
    let userImage = url + img.image
    imageElem.src = userImage;
    

    // for (const pic of pics) {
    //     if(token === pic.user_id){
    //         document.getElementById("profile-image").style.backgroundImage = `url(${url}${pic.profileImage})` 

    //     }
    // }

    // = `url(${settingsUrl})`;
    // document.querySelector(".individual_like").innerHTML = `<i class="far fa-heart"></i>  <span>${image.likes}</span>`
    // document.querySelector(".individual_like").style.display = "none";
    // document.querySelector(".individual_favorite").innerHTML = `<i class="far fa-star"></i>  <span>${image.favorites}</span>`
    // document.querySelector(".image_comments").innerHTML = `<button>${image.comments}  comments</button>`
    

    divEl.appendChild(imageElem)
    container.appendChild(divEl);
    // console.log(container)

    let downloadContainer = document.querySelector(".picture-size");
    console.log(downloadContainer)

    let ulList = `
            <ul>
                <li class="small-image">
                    <a href="${userImage}" download="${img.tags}" target="_blank">
                        150px 
                    </a>
                </li>
            </ul>`

            console.log(ulList)

    downloadContainer.innerHTML = ulList
}

searchImages = () => {
    searchParameters("#register_option", "search_submit", "#register_Search")
}