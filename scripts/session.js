function checkIfLoggedIn() {
    const currentToken = localStorage.getItem("token")
    if(currentToken){
        if(location.href == "http://127.0.0.1:5501/pages/login.html"){
            location.href = "http://127.0.0.1:5501/index.html";
        }
    }else{
        if(location.href != "http://127.0.0.1:5501/pages/login.html"){
            location.href = "http://127.0.0.1:5501/pages/login.html"
        }
    }
}

checkIfLoggedIn();