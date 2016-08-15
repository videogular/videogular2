function setActive(element) {
    document.querySelectorAll('#links li').forEach(function(link){
        link.className = "";
    });
    element.className = "active";
}

window.onload = function() {
    document.querySelectorAll('#links li').forEach(function(link){
        link.addEventListener('click', function(link) {
            setActive(link);
        }.bind(null, link));
    });
}