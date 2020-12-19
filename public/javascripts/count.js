
function count_up() {
    var count = parseInt(document.getElementById('order_count').value)
    document.getElementById('order_count').value = (count + 1)
}

function count_down() {
    var count = parseInt(document.getElementById('order_count').value)
    if(count <= 1) {
        alert('0이상의 수를 선택해 주세요')
        location.href ='/list'
    }
    else {
        document.getElementById('order_count').value = (count - 1)
    }
}