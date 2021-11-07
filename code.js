let workingNumber = '';
let currentDigit;
let calcStarted = false;
let calcReady = false;
let calcDone = false;
let previous;
let operator;
let answer;
let lastOperator;
let lastNumber;

const currentNumber = document.getElementById('current');
const previousCalculation = document.getElementById('previous');
const workingArea = document.getElementById('workingArea');

function operate() {
    if (operator === '+') {
        answer = parseFloat(previous) + parseFloat(workingNumber);
    }
    else if (operator === '-') {
        answer = parseFloat(previous) - parseFloat(workingNumber);
    }
    else if (operator === 'x') {
        answer = parseFloat(previous) * parseFloat(workingNumber);
    }
    else if (operator === '/') {
        answer = parseFloat(previous) / parseFloat(workingNumber);
        if (answer === Infinity) {
            alert("I can't let you do that, Dave")
            reset();
            return
        }
    }
    if (answer > 99999999) {
        answer = 99999999;
    }
    if (String(answer).length > 9 && (String(answer)).includes(".")) {
        length = (String(answer)).length
        for (i = length; ;) {
            answer = Number(answer).toFixed(length)
            if (String(answer).length > 9) {
                length--;
            }
            else {
                break
            }

        }
    }
    console.log(previous + operator + workingNumber)
    console.log(answer)
    document.getElementById('current').innerHTML = '';
    document.getElementById('previous').innerHTML = '';
    currentNumber.append(answer);
    previousCalculation.append(previous + ' ' + operator + ' ' + workingNumber)
    lastOperator = operator;
    operator = '';
    lastNumber = workingNumber;
    previous = answer;
    workingNumber = answer;
    document.getElementById('decimal').disabled = false;
    calcDone = true;
}

function reset() {
    workingNumber = '';
    currentDigit = '';
    previous = '';
    lastNumber = '';
    lastOperator = '';
    answer = '';
    document.getElementById('current').innerHTML = '';
    document.getElementById('previous').innerHTML = '';
    calcReady = false;
    calcStarted = false;
    calcDone = false;
    document.getElementById('decimal').disabled = false;

}

workingArea.addEventListener('click', (e) => {
    const isButton = e.target.nodeName === 'BUTTON';
    if (!isButton) {
        return;
    }
    else if (e.target.id === 'c') {
        reset()
    }
    else if (workingNumber === '0' && (parseFloat(e.target.id)) == 0) {
        return
    }
    else if (!isNaN(parseFloat(e.target.id))) {
        if (calcDone === true) {
            reset();
        }
        if (workingNumber.length > 8) {
            return
        }
        currentDigit = parseFloat(e.target.id);
        if (workingNumber === '0') {
            workingNumber = currentDigit;
            document.getElementById('current').innerHTML = workingNumber;
            calcStarted = true;
            return
        }
        workingNumber += currentDigit;
        currentNumber.append(currentDigit);
        calcStarted = true;
    }
    else if (calcStarted === true && e.target.id === 'decimal') {
        currentDigit = '.';
        workingNumber += currentDigit;
        currentNumber.append(currentDigit);
        document.getElementById('decimal').disabled = true;
    }
    else if (e.target.classList.contains('operators') && calcStarted != true) {
        return
    }
    else if (e.target.classList.contains('equals') && calcStarted === calcReady === true && currentDigit !== '') {
        if (operator === '' && lastOperator === '') { return }
        if (calcDone === true) {
            operator = lastOperator;
            workingNumber = lastNumber;
        }

        operate()
    }
    else if (e.target.classList.contains('operators') && !e.target.classList.contains('c') && !e.target.classList.contains('delete')) {
        if (calcReady === true && calcDone === false) {
            operate()
        }
        if (e.target.id === 'equals' && calcReady === calcStarted === false) {
            return
        }

        if (e.target.id === 'plus') {
            operator = '+'

        }
        else if (e.target.id === 'minus') {
            operator = '-'

        }
        else if (e.target.id === 'multiply') {
            operator = 'x'

        }
        else if (e.target.id === 'divide') {
            operator = '/'

        }
        workingNumber = parseFloat(workingNumber);
        document.getElementById('previous').innerHTML = '';
        previousCalculation.append(workingNumber + ' ' + operator)
        previous = workingNumber;
        workingNumber = '';
        currentDigit = '';
        document.getElementById('current').innerHTML = '';
        calcReady = true;
        calcDone = false;
        calcStarted = false;
        document.getElementById('decimal').disabled = false;
    }
    else if (e.target.id === 'delete' && calcDone === false) {
        workingNumber = workingNumber.slice(0,- 1);
        document.getElementById('current').innerHTML = workingNumber;
    }

}
)