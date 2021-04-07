window.onload = () => {
    imageFetch();
    dropDown();
    searchImages();
    removingLogin();
}

imageFetch = () => {
    let key = config.MY_KEY;
    let image = fetch(`https://pixabay.com/api/?key=${key}&image_type=photo`);
    image.then((response) => {
        return response.json();
    })
    .then((data) =>{
        addImage(data.hits);
        console.log(data.hits)
    })
}


addImage = (images) => {
    wrapperSelector(images, ".photo_wrapper")
}

