
export function loadBookends() {
    console.log("loaded bookends!");
    
    $(function(){
        $("#nav-script").load("navbar.html")
    });

    $(function(){
        $("#footer-script").load("footer.html")
    });
}