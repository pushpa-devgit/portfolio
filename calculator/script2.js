let inputBox = document.getElementById('inputBox')
let buttons = document.querySelectorAll('button')

let srting = ''

buttons.forEach(element =>{
    element.addEventListener('click', (b)=>{
        if(b.target.innerText == '='){
            string = String(eval(string))
            inputBox.value = string;
        } 
        else if(b.target.innerText == 'AC'){
                 string=''
                 inputBox.value = string;
        }
        else if(b.target.innerText == 'DEL'){
            string= string.substring(0,string.lenght-1)
            inputBox.value = string;
        }
        else if(b.target.id == 'plusMinus'){
            string = string(-eval(string))
            inputBox.value = string;
        }
        else{
            string += b.target.innerText
            inputBox.value = string
        }
    })

})