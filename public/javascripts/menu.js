

function visi() {
    let menuicon = document.getElementById('menuicon');
    let menu = document.getElementById('menu');
    
    if (menuicon.checked == true) {
        menu.visiblity = visible;
        alert("df")
    } else {
        menu.visiblity = hidden;
        alert("ddf")
    }
}