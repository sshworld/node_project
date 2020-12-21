const image = document.querySelector("#image1");
const fileName = document.querySelector(".file-name");
const cancleBtn = document.querySelector(".cancle-btn");
const customBtn = document.querySelector("#custom-btn");
let regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;

let count = 2

let inCount = 2

function defaultBtnActive(imgCount) {
    let imgId = "goImg"+imgCount
    const img = document.getElementById(imgId)

    let default_btn = "default-btn"+imgCount
    const defaultBtn = document.getElementById(default_btn);
    
    defaultBtn.click()

    defaultBtn.addEventListener("change", function() {
        const file = this.files[0]
        if(file) {
            const reader = new FileReader();
            reader.onload = function() {
                const result = reader.result;
                img.src = result;
                img.hidden = false;
                image.classList.add("active");
            }

            reader.readAsDataURL(file);
        }
        if(this.value) {
            let valueStore = this.value.match(regExp);
            fileName.textContent= valueStore;
        }
    })

    
}



function stepPlus() {
    var div = document.createElement('div')
    
    var str = `<div class="wrapping" id="wrapping">
    <div class="image" id="image` + count + `">
        <div class="image-content">
            <img id="goImg` + count + `" src="" alt="" hidden>
        </div>
        <div class="content">
            <div class="icon"><i class="fas fa-cloud-upload-alt"></i></div>
            <div class="text">No file chosen, yet!</div>
        </div>
        <div class="cancle-btn" id="cancle-btn` + count + `"><i class="fas fa-times"></i></div>
        <div class="file-name">File name here</div>
    </div>
    <input type="file" name="recipe" id="default-btn` + count + `" hidden>
    <button type="button" onclick="defaultBtnActive(` + count + `)" id="custom-btn">Choose a file</button>
    <div class="wrapper" style="width: 430px;">
        <input type="text" name="step" required="required">
        <label for="">Step` + (count-1) + `</label>
    </div>
</div>`

    div.id = "steps"
    div.innerHTML = str
    document.getElementById("stepParents").appendChild(div)
    count++
}

function addIn() {
    var div = document.createElement('div')
    
    var str = `<div class="wrapper" style="width: 30%;">
    <input type="text" name="ingredient" required="required">
    <label for="">재료</label>
</div>
<div class="wrapper" style="width: 30%; margin-left: 20px;">
    <input type="text" name="count" required="required">
    <label for="">수량</label>
</div>`

    div.id = "stepIn"
    div.innerHTML = str
    document.getElementById("stepIng").appendChild(div)
    inCount++
}