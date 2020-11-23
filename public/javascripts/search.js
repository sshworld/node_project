
const searchWrapper = document.querySelector(".search-input")

const inputBox = searchWrapper.querySelector('input')

const suggBox = searchWrapper.querySelector('.autocom-box')

inputBox.onkeyup = (e) => {
    let userDate = e.target.value; //user entered data
    let emptyArray = [];
    if(userDate) {
        emptyArray = suggestions.filter((data) => {
            // filtering array value and user char to lowercase and return only those word/sentc which are starts with user entered word
            return data.toLocaleLowerCase.startsWith(userDate.toLocaleLowerCase());
            
        })
        emptyArray = emptyArray.map((data) => {
            return data = '<li>' + data + '</li>';
        })
        console.log(emptyArray)
        searchWrapper.classList.add("active")
    }
    else {

    }
    showSuggestions(emptyArray)
}

function showSuggestions(list) {
    let listData;
    if(!list.length) {
        
    }else {
        listData = list.join('')
    }
    suggBox.innerHTML = listData
}