$(document).ready(function(){
    if(localStorage['region'] === undefined || localStorage['region'] === 'undefined'){
        init(setPopupData);
    }else{
        setPopupData();
    }

});