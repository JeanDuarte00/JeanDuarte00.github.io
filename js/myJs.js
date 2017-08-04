// calculate age

function myAge() {
    var tag = document.getElementById("myAge");
    var day = 6, month = 8, year = 1995;
    var today = new Date();
    var age ;
    
    age = today.getFullYear() - year - 1 ;
    // if completed new year
    if( today.getMonth() > month ){
            age++;
    }else{
        if(today.getMonth() == month && today.getDate() >= day){
            age++;
        }
        
    }
    tag.innerHTML = ( "I'm " + age + " years old," );
}



