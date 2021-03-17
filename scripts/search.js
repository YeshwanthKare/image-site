window.onload = () => {
    dropDown();
    imageFetch();
    // searchParameters();
    // console.log(searchParameters())
}



const getImageType = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('search');
}


const getImageQuery = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('query')
}

imageFetch = () => {
    let key = config.MY_KEY;
    let image = fetch(`https://pixabay.com/api/?key=${key}&q=${getImageQuery()}&image_type=${getImageType()}`);
    image.then((response) => {
        return response.json();
    })
    .then((data) =>{
        addImage(data.hits);
        console.log(data.hits)
    })
}

addImage = (images) => {
    wrapperSelector(images, ".search_wrapper");
}