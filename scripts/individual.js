
window.onload = () => {
    getIndividualImage();
}

const getPostIdParam = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('id');
}


function getIndividualImage() {
    const my_key = config.MY_KEY;
    const myUrl = `https://pixabay.com/api/?key=${my_key}&id=${getPostIdParam()}`
    fetch(myUrl, {
        method: 'GET',
    })
    .then(res => {
        return res.json();
    }) 
    .then((data)=>{
        showIndividualImage(data.hits[0])
        // console.log(data);
    })
    .catch((error) => {
        console.log(error);
    })
}

const showIndividualImage = (image) => {
    console.log(image)
    console.log(image.user)
    let container = document.querySelector(".individual_image_container");
    let imageElem = document.createElement('img');
    imageElem.src = image.largeImageURL;
    imageElem.setAttribute("id", "image-source");

    document.querySelector(".profile_image").style.backgroundImage = `url(${image.userImageURL})`;
    document.querySelector(".profile_name").innerText = image.user
    document.querySelector(".individual_like").innerHTML = `<i class="far fa-heart"></i>  <span>${image.likes}</span>`
    document.querySelector(".individual_favorite").innerHTML = `<i class="far fa-star"></i>  <span>${image.favorites}</span>`
    document.querySelector(".image_comments").innerHTML = `<button>${image.comments}  comments</button>`



    

    container.appendChild(imageElem);

}