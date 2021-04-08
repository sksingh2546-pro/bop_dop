

function logout() {
    sessionStorage.clear();
    localStorage.clear();
    location.href = "../authentication/login.html";
}
function userlogout() {
    sessionStorage.clear();
    localStorage.clear();
    location.href = "authentication/login.html";
}
function handlerlogout(){
    sessionStorage.clear();
    localStorage.clear();
    location.href = "logout.html";
}