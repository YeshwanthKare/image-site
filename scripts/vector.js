window.onload = () => {
    dropDown();
    imageFetch();
    searchImages();
    removingLogin();
}

imageFetch = () => {
    let key = config.MY_KEY;
    let image = fetch(`https://pixabay.com/api/?key=${key}&image_type=vector`);
    image.then((response) => {
        return response.json();
    })
    .then((data) =>{
        addImage(data.hits);
        console.log(data.hits)
    })
}

addImage = (images) => {
    wrapperSelector(images, ".vector_wrapper");
}