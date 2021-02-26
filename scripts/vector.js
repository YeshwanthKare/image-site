window.onload = () => {
    dropDown();
    imageFetch();
}

imageFetch = () => {
    let key = config.MY_KEY;
    let image = fetch(`https://pixabay.com/api/?key=${key}&q=nature&image_type=vector`);
    image.then((response) => {
        return response.json();
    })
    .then((data) =>{
        addImage(data.hits);
        console.log(data.hits)
    })
}

addImage = (images) => {
    var imageEl = document.querySelector(".vector_wrapper");
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