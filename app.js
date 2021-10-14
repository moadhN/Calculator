const display1El = document.querySelector('.display-1');
const display2El = document.querySelector('.display-2');
const numbersEl = document.querySelectorAll('.number');
const operationEl = document.querySelectorAll('.operator');
const equalEl = document.querySelector('.equal');
const clearAll = document.querySelector('.clear');
const clearLast = document.querySelector('.delete');
const operate = (a, b, oper) => { return Function('a', 'b', `return a ${oper} b`)(a, b) }

//const tempResultEl = document.querySelector('.temp-result');

let dis1Num = '';
let dis2Num = '';
let lastOperation = '';
let tempResult = '';
let result = null;
//let haveDot = false;



/* number click */
numbersEl.forEach(number => number.addEventListener("click", numberClickerd))

function numberClickerd(element) {
    const dotRexp = new RegExp(/[\.]+/, 'g');
    const operatorsRexp = new RegExp(/[\+\-÷×\%]/, 'g');
    let l = dis2Num.split(operatorsRexp).length
    let chekDot = dis2Num.split(operatorsRexp)[l - 1]

    if (dotRexp.test(chekDot) && element.target.innerText == '.') return;
    dis2Num += element.target.innerText;
    display2El.innerText = dis2Num
}


/* operator click */

operationEl.forEach(operator => operator.addEventListener('click', operatorClicked))

function operatorClicked(element) {

    lastOperation = element.target.innerText;
    let operatorRexp = new RegExp(/[\+\-÷×%]$/, 'g')

    if (operatorRexp.test(dis2Num)) {

        dis2Num = dis2Num.slice(0, -1)
        dis2Num += lastOperation

        display2El.innerText = dis2Num
    } else {
        dis2Num += lastOperation
        display2El.innerText = dis2Num
    }

}

/* equal clicked */

equalEl.addEventListener('click', equalOperation)

function equalOperation() {


    let operatorsResultRexp = new RegExp(/[\+\-÷×\%]/, 'g')
    result = dis2Num.split('')
        .map(char => {
            //console.log(char)
            if (operatorsResultRexp.test(char)) {
                if (char == '×') {
                    return char = ' * '
                }
                if (char == '%') {
                    return char = ' % '
                } if (char == '÷') {
                    return ' / '
                }
                else {
                    return ` ${char} `
                }
            } else {
                return char
            }
        }).join("")
    result = result.split(' ')

    result = mathOperation(result)
    tempResult = result
    display1El.innerText = parseFloat(result)
    display2El.innerText = parseFloat(result)
}


function mathOperation([a, op, b, ...arr], r = tempResult) {
    r = operate(Number(a), Number(b), op)
    arr.unshift(r)
    if (arr.length === 1) return r
    else {
        return mathOperation(arr)
    }
}

/* all clear */

clearAll.addEventListener('click', clearAllDisplay)

function clearAllDisplay() {
    dis1Num = '';
    dis2Num = '';
    display1El.innerText = '0';
    display2El.innerText = '0';
    result = null;

}
/* clear last  */

clearLast.addEventListener('click', clearLastDisplay)

function clearLastDisplay() {
    dis2Num = dis2Num.slice(0, -1)
    //console.log(dis2Num)
    display2El.innerText = dis2Num

    if (dis2Num.length == 0) {
        display2El.innerText = '0'
    }
}



/* keydown */


window.addEventListener('keydown', numberKeyDown)
window.addEventListener('keydown', operatorKeyDown)
window.addEventListener('keydown', equalKeyDown)
window.addEventListener('keydown', clearLastDisplayKey)
window.addEventListener('keydown', clearAllKey)


/* number key code */

function numberKeyDown(e) {
    const key = document.querySelector(`.number[data-key="${e.keyCode}"]`)
    if (!key) return;
    e.preventDefault()

    const dotRexp = new RegExp(/[\.]+/, 'g');
    const operatorsRexp = new RegExp(/[\+\-÷×\%]/, 'g');
    let l = dis2Num.split(operatorsRexp).length
    let chekDot = dis2Num.split(operatorsRexp)[l - 1]

    if (dotRexp.test(chekDot) && element.target.innerText == '.') return;
    dis2Num += key.innerText;
    display2El.innerText = dis2Num

}

/* operator key code */

function operatorKeyDown(e) {
    const key = document.querySelector(`.operator[data-key="${e.keyCode}"]`)
    if (!key) return;
    e.preventDefault()


    lastOperation = key.innerText;
    let operatorRexp = new RegExp(/[\+\-÷×%]$/, 'g')
    ////console.log(lastOperation)

    if (operatorRexp.test(dis2Num)) {
        //console.log("before", dis2Num)
        dis2Num = dis2Num.slice(0, -1)
        dis2Num += lastOperation
        //console.log("after", dis2Num)
        display2El.innerText = dis2Num
    } else {
        dis2Num += lastOperation
        display2El.innerText = dis2Num
    }
}

/* equal Key Down */

function equalKeyDown(e) {
    const key = document.querySelector(`.equal[data-key="${e.keyCode}"]`)
    if (!key) return;
    e.preventDefault()






    let operatorsResultRexp = new RegExp(/[\+\-÷×\%]/, 'g')

    result = dis2Num.split('')
        .map(char => {
            //console.log(char)
            if (operatorsResultRexp.test(char)) {
                if (char == '×') {
                    return char = ' * '
                }
                if (char == '%') {
                    return char = ' % '
                } if (char == '÷') {
                    return ' / '
                }
                else {
                    return ` ${char} `
                }
            } else {
                return char
            }
        }).join("")
    result = result.split(' ')

    result = mathOperation(result)
    tempResult = result
    display1El.innerText = parseFloat(result)
    display2El.innerText = parseFloat(result)
}


/* lear last */

function clearLastDisplayKey(e) {
    const key = document.querySelector(`.delete[data-key="${e.keyCode}"]`)
    if (!key) return;

    e.preventDefault()


    dis2Num = dis2Num.slice(0, -1)
    //console.log(dis2Num)
    display2El.innerText = dis2Num

    if (dis2Num.length == 0) {
        display2El.innerText = '0'
    }
}


/* clear all */


function clearAllKey(e) {
    const key = document.querySelector(`.clear[data-key="${e.keyCode}"]`)
    if (!key) return;
    e.preventDefault()


    dis1Num = '';
    dis2Num = '';
    display1El.innerText = '0';
    display2El.innerText = '0';
    result = null;

}

/* transition  */

window.addEventListener('keydown', transitionButton)

function transitionButton(e) {
    const buttonsTransition = document.querySelector(`button[data-key="${e.keyCode}"]`)
    buttonsTransition.classList.add('active')
}
const buttons = document.querySelectorAll('button')
buttons.forEach(button => button.addEventListener('transitionend', removeEventListener))


function removeEventListener(e) {


    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('active');
}