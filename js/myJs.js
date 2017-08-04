function myAge(){
    const myBirthYear = 1995;
    const myBirthMonth = 9;
    const myBirthDay = 6;
    
    var hoje = new Date();
    var thisDay = hoje.getDay();
    var thisMonth = hoje.getMonth();
    var thisYear = hoje.getYear();
    
    
    if(thisMonth >= myBirthMonth && thisDay >= myBirthDay){
        return thisYear - myBirthYear;
    }
    return thisYear - myBirthYear - 1;
}