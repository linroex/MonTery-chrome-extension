$(document).ready(function(){
    if(localStorage['region'] === undefined || localStorage['region'] === 'undefined'){
        init();
    }else{
        console.log(localStorage['region']);
    }
    
    setTimeout(setPopupData(), 3000);
});