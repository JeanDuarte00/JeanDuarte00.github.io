function myAge(){
    const myBirthYear = 1995;
    const myBirthMonth = 9;
    const myBirthDay = 6;
    
    var hoje = new Date(),
        thisDay = hoje.getDay(),
        thisMonth = hoje.getMonth(),
        thisYear = hoje.getYear();
        
    var result;
    if(thisMonth >= myBirthMonth && thisDay >= myBirthDay){
        result = thisYear - myBirthYear;
    }
    result = thisYear - myBirthYear - 1;
    
    var tag = document.getElementById("myAge");
    tag.innerHtml(result);
    
}