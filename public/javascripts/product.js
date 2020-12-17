const image = document.querySelector(".image");
const fileName = document.querySelector(".file-name");
const cancleBtn = document.querySelector(".cancle-btn");
const defaultBtn = document.querySelector("#default-btn");
const customBtn = document.querySelector("#custom-btn")
const img = document.querySelector("#goImg")
let regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;

function defaultBtnActive() {
    defaultBtn.click();
}

defaultBtn.addEventListener("change", function() {
    const file = this.files[0];
    if(file) {
        const reader = new FileReader();
        reader.onload = function() {
            const result = reader.result;
            img.src = result;
            img.hidden = false;
            image.classList.add("active");
        }
        cancleBtn.addEventListener("click", function() {
            img.src = ""
            image.classList.remove("active");
            img.hidden = true;
        })
        reader.readAsDataURL(file);
    }
    if(this.value) {
        let valueStore = this.value.match(regExp);
        fileName.textContent= valueStore;
    }
})