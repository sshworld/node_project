function order(url, count) {

    if(parseInt(document.getElementById('order_count').value) <= 0) {
        alert("구매 수량이 0개 이하 입니다.")
        document.getElementById('order_count').value = 0
    }
    else if(parseInt(document.getElementById('order_count').value) > parseInt(count)) {
        alert("재고보다 주문 수량이 많습니다.")
        document.getElementById('order_count').value = 0
    }
    else {
       
        location.href = url + document.getElementById('order_count').value;
    }

}

function basket(url, count) {
    if(parseInt(document.getElementById('order_count').value) <= 0) {
        alert("수량이 0개 이하 입니다.")
        document.getElementById('order_count').value = 0
    }
    else if(parseInt(document.getElementById('order_count').value) > parseInt(count)) {
        alert("재고보다 수량이 많습니다.")
        document.getElementById('order_count').value = 0
    }
    else {
        location.href = url; //+ document.getElementById('order_count').value;
    }
}