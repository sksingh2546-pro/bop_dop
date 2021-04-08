
if (sessionStorage.getItem('HandlerAuthenticationState') === null
    && localStorage.getItem('doc_name') == null
) {
    window.open("login.html", "_self");
}