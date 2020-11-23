

function visi() {
    let menuicon = document.getElementById('menuicon').checked;

    if (menuicon) {
        document.getElementById('menu').style.display = 'flex'
        document.getElementById('nav').style.display = 'none'
        document.getElementById('search').style.display = 'none'
        
    } else {
        document.getElementById('menu').style.display = 'none'
        document.getElementById('nav').style.display = 'flex'
        document.getElementById('search').style.display = 'flex'

    }
}