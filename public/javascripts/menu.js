

function visi() {
    let menuicon = document.getElementById('menuicon').checked;
    console.log(menu)

    if (menuicon) {
        document.getElementById('menu').style.display = 'flex'
        document.getElementById('menu').style.transition = '1s'
        
    } else {
        document.getElementById('menu').style.display = 'none'
        
    }
}