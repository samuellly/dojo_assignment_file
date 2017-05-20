//Basic: Make a function that can be used anywhere in your file and that when invoked will console.log('I am running!'); 
//Give it the name runningLogger.

function runningLogger(){
    console.log('I am running!')
}

runningLogger();


//Basic: Make a function that is callable, has one parameter and multiplies the value of the parameter by 10 
//before returning the result. Give it the name multiplyByTen. Invoke it, passing it the argument 5.

function multiplyByTen(number){
    number = number*10;
    return number;
    
    
}
console.log(multiplyByTen(5));

//Basic: Write two functions (stringReturnOne and stringReturnTwo) that each return a different hard-coded string

function stringReturnOne() {
    return "Hello"
}

function stringReturnTwo(){
    var a = 'Hi';
    var b = 'World';
    return (a + " " + b)
}

console.log(stringReturnTwo());


//Medium: Write a function named caller that has one parameter. If the argument provided to caller is a function (typeof may be useful),
//invoke the argument. Nothing is returned.

function caller(a) {
    if (typeof a == 'function') {
        a = 'Hello';
    }
}

//Medium: Write a function named myDoubleConsoleLog that has two parameters, 
//if the arguments passed to the function are functions, console.log the value that each, when invoked, returns.
function myDoubleConsoleLog(a,b) {
    if (typeof a == 'function') {
        console.log(a);
    } else if (typeof b== 'function'){
        console.log(b);
    }
}

//Hard: Write a function named caller2 that has one parameter. Have it console.log the string 'starting', wait 2 seconds, 
//and then invokes the argument if the argument is a function. (setTimeout may be useful for this one.) The function should then console.
//log ¡®ending?¡¯ and return ¡°interesting¡±. Invoke this function by passing it myDoubleConsoleLog.

function caller2(param){
    console.log(starting);
    setTimeout(function(){
        if(typeof param ==='function'){
            param(stringReturnOne,stringReturnTwo);
        }
    },2000);
    console.log('Ending');
    return "interesting"
}
console.log(myDoubleConsoleLog);