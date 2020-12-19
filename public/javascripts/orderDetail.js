function addr() {
    var select = document.getElementById('order-addr')
    
    var JsonData = document.getElementById('myAddrData').value

    JsonData = JSON.parse(JsonData)

    var shipping_num = document.getElementById('shipping_num')

    var basic_addr = document.getElementById('basic_addr')

    var detail_addr = document.getElementById('detail_addr')

    shipping_num.value = JsonData[select.selectedIndex].place_num
    basic_addr.value = JsonData[select.selectedIndex].place_addr
    detail_addr.value = JsonData[select.selectedIndex].place_addrinfo
}

function card() {
    var selectCard = document.getElementById('order-card')
    
    var cardData = document.getElementById('myCardData').value

    cardData = JSON.parse(cardData)

    var card_num = document.getElementById('card_num')

    var card_date = document.getElementById('card_date')

    var card_type = document.getElementById('card_type')

    card_num.value = cardData[selectCard.selectedIndex].card_num
    card_date.value = cardData[selectCard.selectedIndex].card_date
    card_type.value = cardData[selectCard.selectedIndex].card_kind
}