
let filterbtn = document.querySelectorAll(".filters button"),
chnageimg = document.getElementById("change-img"),
fileinput = document.getElementById("input-file"),
previewimg = document.querySelector(".img-preview img"),
rangediv = document.querySelector(".range-div"),
value = document.querySelector(".range-div small"),
slider = document.querySelector(".form-range"),
rotatefilters = document.querySelectorAll(".rotatefilters button"),
resetbtn = document.getElementById('reset'),
savebtn = document.getElementById('save'),
brightness = 100, saturation = 100, grayscale = 0, invertion = 0,
rotate = 0, flip = -1

filterbtn.forEach(option => {
option.addEventListener("click", () => {
    document.querySelector(".filters .btn-primary").classList.remove("btn-primary")
    option.classList.add("btn-primary")
    let t = option.innerHTML
    rangediv.firstElementChild.innerHTML = t
    let filter = document.querySelector(".filters .btn-primary")
    if (filter.id === 'brightness') {
        slider.value = brightness
        value.innerText = `${brightness}%`
    }
    else if (filter.id === 'saturation') {
        slider.value = saturation
        value.innerText = `${saturation}%`
    }
    else if (filter.id === 'grayscale') {
        slider.value = grayscale
        value.innerText = `${grayscale}%`
    }
    else {
        slider.value = invertion
        value.innerText = `${invertion}%`
    }
})
})
chnageimg.addEventListener("click", () => {
fileinput.click()
})
fileinput.addEventListener("change", () => {
let file = fileinput.files[0]
if (!file) return
previewimg.src = URL.createObjectURL(file)
resetbtn.click()
document.getElementsByClassName("controls")[0].classList.remove("disable")

})
slider.addEventListener("input", () => {
value.innerText = `${slider.value}%`;
let filter = document.querySelector(".filters .btn-primary")
if (filter.id === 'brightness') brightness = slider.value
else if (filter.id === 'saturation') saturation = slider.value
else if (filter.id === 'grayscale') grayscale = slider.value
else invertion = slider.value
apply()
})
rotatefilters.forEach(option => {
option.addEventListener("click", () => {
    if (option.id === 'left') {
        rotate -= 90
    }
    else if (option.id === 'right') rotate += 90
    else flip = (flip == -1) ? 1 : -1
    apply()
})
})
const apply = () => {
previewimg.style.transform = `rotate(${rotate}deg) scaleX(${flip})`
previewimg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${invertion}%) grayscale(${grayscale}%)`;

}
resetbtn.addEventListener("click",()=>{
brightness = 100, saturation = 100, grayscale = 0, invertion = 0,
rotate = 0, flip = -1
apply()
filterbtn[0].click()
})
savebtn.addEventListener("click",()=>{
let canvas=document.createElement('canvas')
let ctx=canvas.getContext('2d')
canvas.width=previewimg.naturalWidth
canvas.height=previewimg.naturalHeight
ctx.filter=`brightness(${brightness}%) saturate(${saturation}%) invert(${invertion}%) grayscale(${grayscale}%)`;
ctx.translate(canvas.width/2,canvas.height/2)
if(rotate!==0)
    ctx.rotate(rotate*Math.PI/180)
ctx.scale(flip,1)
ctx.drawImage(previewimg,-canvas.width/2,-canvas.height/2,canvas.width,canvas.height)
const link=document.createElement('a')
link.download='image.jpg'
link.href=canvas.toDataURL()
link.click()
})