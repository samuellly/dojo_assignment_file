var array = [1, "apple", -3, "orange", 0.5];
numberOnly(array);

function numberOnly(array) {
    var newArray=[];
    for(var i=0; i<array.length;i++){
    if(typeof array[i] ==="number"){
        newArray.push(array[i]);
    }
}
 console.log(newArray);
}
