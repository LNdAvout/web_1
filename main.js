const WIDTH = 500
const HEIGHT = 500
const DPI_W = WIDTH * 2
const DPI_H = HEIGHT * 2
const RAZ = DPI_W / 60
const CANVAS = document.getElementById('draw')
const ctx = CANVAS.getContext('2d')
CANVAS.style.width = WIDTH + 'px'
CANVAS.style.height = HEIGHT + 'px'
CANVAS.width = DPI_W
CANVAS.height = DPI_H
OTSTUP = 100
DIVISION = (WIDTH - 100) / 5
ctx.font = "40px calibri";
ctx.lineWidth = "3";
const zeroX = DPI_W / 2
const zeroY = DPI_H / 2
let x = zeroX
let y = zeroY
let znX = 0
let znY = 0
let r = 1
let kx = 0
let ky = 0
let popodanie = -1


function drawBase() {
    ctx.beginPath()
    ctx.strokeStyle = '#000000'
    ctx.fillStyle = "#000000"
    // Y
    ctx.fillText('Y', DPI_W / 2 + RAZ, RAZ * 2);
    // Ось Y
    ctx.moveTo(DPI_W / 2, 0);
    ctx.lineTo(DPI_W / 2, DPI_H);
    // X
    ctx.fillText('X', DPI_W - RAZ * 2, DPI_H / 2 - RAZ);
    // Ось X
    ctx.moveTo(0, DPI_H / 2);
    ctx.lineTo(DPI_W, DPI_H / 2);

    // Вертикальная стрелка
    ctx.moveTo(DPI_W / 2, 0);
    ctx.lineTo(DPI_W / 2 - RAZ / 2, RAZ * 2);
    ctx.moveTo(DPI_W / 2, 0);
    ctx.lineTo(DPI_W / 2 + RAZ / 2, RAZ * 2);

    // Горизонтальная стрелка
    ctx.moveTo(DPI_W, DPI_H / 2);
    ctx.lineTo(DPI_W - RAZ * 2, DPI_H / 2 - RAZ / 2);
    ctx.moveTo(DPI_W, DPI_H / 2);
    ctx.lineTo(DPI_W - RAZ * 2, DPI_H / 2 + RAZ / 2);

    // Горизонтальная разметка
    for (let i = OTSTUP; i <= DPI_W - OTSTUP; i += DIVISION) {
        ctx.moveTo(i, DPI_H / 2 - RAZ / 2);
        ctx.lineTo(i, DPI_H / 2 + RAZ / 2);
    }

    // Вертикальная разметка
    for (let i = OTSTUP; i <= DPI_H - OTSTUP; i += DIVISION) {
        ctx.moveTo(DPI_W / 2 - RAZ / 2, i);
        ctx.lineTo(DPI_W / 2 + RAZ / 2, i);
    }

    ctx.stroke()
    ctx.closePath()
}

function drawShapes() {
    const pixLength = r * 80
    ctx.beginPath()
    ctx.strokeStyle = '#42aaff'
    ctx.fillStyle = "#42aaff"

    // Квадрат
    ctx.moveTo(zeroX, zeroY)
    ctx.lineTo(zeroX - pixLength, zeroY)
    ctx.lineTo(zeroX - pixLength, zeroY - pixLength)
    ctx.lineTo(zeroX, zeroY - pixLength)
    ctx.lineTo(zeroX, zeroY)
    ctx.fill()

    // Четверть окружности
    ctx.arc(zeroX, zeroY, pixLength, 0,  -Math.PI / 2, true);
    ctx.lineTo(zeroX, zeroY)
    ctx.fill()

    // Треугольник
    ctx.moveTo(zeroX, zeroY)
    ctx.lineTo(zeroX + pixLength / 2, zeroY)
    ctx.lineTo(zeroX, zeroY + pixLength)
    ctx.fill()

    ctx.stroke()
    ctx.closePath()
    drawBase()
    drawPoint()
}


function drawPoint() {
    if (kx !== 0 && ky !== 0) {
        ctx.beginPath()
        ctx.strokeStyle = '#000000'
        if (popodanie === -1) {
            ctx.fillStyle = "#ffC0CB"
        } else if (popodanie === 0) {
            ctx.fillStyle = "#ff0000"
        } else {
            ctx.fillStyle = "#00ff00"
        }

        ctx.arc(x, y, 10, 0, Math.PI * 2, true);
        ctx.fill()
        ctx.stroke()
        ctx.closePath()
    }
}

function clear () {
    ctx.clearRect(0, 0, DPI_W, DPI_H);
}

function setX (val) {
    kx = 1
    znX = val
    x = zeroX  + val * 80
    popodanie = -1
    clear()
    drawShapes()
    drawPoint()
}

function setY (znach) {
    znY = znach.value.slice(0, 15)
    ky = 1
    y = zeroX  - parseFloat(znach.value) * 80
    popodanie = -1
    clear()
    drawShapes()
    drawPoint()
}

function setR (val) {
    let elems = document.getElementsByTagName("input")

    for( let i = 0; i < elems.length; i++)
    {
        if(elems[i].type === "checkbox")
        {
            elems[i].checked = false
        }
    }
    document.getElementById("choiceCheck" + val).checked = true;
    r = val
    popodanie = -1
    clear()
    drawShapes()
}
setR(2)
setX(0)


function isNumeric() {
    return (/^\-?\d+\.?\d{0,}$/g.test(znY) && znY > -3 && znY < 3)
}


let inputY = document.querySelector('.my-input')
let predupr = document.querySelector('.predupr')
function check_in_php () {
    if (isNumeric() && ky !== 0) {
        inputY.classList.remove('error')
        predupr.classList.remove('error')
        let formData = new FormData();
        formData.append("x", znX);
        formData.append("y", znY);
        formData.append("r", r);
        fetch("./php/check.php", {
            method: "POST",
            body: formData
        }).then(response => response.text()).then(function (serverAnswer) {
            localStorage.setItem("data", serverAnswer + localStorage.getItem("data"))
            document.getElementById("forPhp").innerHTML = localStorage.getItem("data")
            popodanie = (serverAnswer.indexOf("Попадание") === -1) ? 0 : 1
            clear()
            drawShapes()
            drawPoint()
        }).catch(err => console.log("Ошибка, причина ошибки - " + err.status))
    } else {
        inputY.classList.add('error')
        predupr.classList.add('error')
    }
}

function clear_table() {
    localStorage.setItem("data", "");
    document.getElementById("forPhp").innerHTML = "";
}

document.getElementById("forPhp").innerHTML = localStorage.getItem("data")

/*
console.log(isNumeric('-0.-21'))
console.log(isNumeric('-0.'))
console.log(isNumeric('0'))
console.log(isNumeric('0.'))
console.log(isNumeric('-0..2'))
console.log(isNumeric('-02'))
console.log(isNumeric('-2.4'))
console.log(isNumeric('-5'))
console.log(isNumeric('--2'))
console.log(isNumeric('3.6'))
*/









