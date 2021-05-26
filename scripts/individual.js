window.onload = () => {
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

console.log(userSettingFetch())


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
    imageElem.src = image.largeImageURL;
    // imageElem.setAttribute("id", "image-source);

    document.querySelector(".profile_image").style.backgroundImage = `url(${image.userImageURL})`;
    document.querySelector(".profile_name").innerText = image.user
    document.querySelector(".individual_like").innerHTML = `<i class="far fa-heart"></i>  <span>${image.likes}</span>`
    document.querySelector(".individual_favorite").innerHTML = `<i class="far fa-star"></i>  <span>${image.favorites}</span>`
    document.querySelector(".image_comments").innerHTML = `<button>${image.comments}  comments</button>`
    

    divEl.appendChild(imageElem)
    container.appendChild(divEl);
    console.log(container)

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
                // document.getElementById("profile-image").style.backgroundImage = `url(${url}${pic.profileImage})` 
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
}