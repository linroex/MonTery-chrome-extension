$(document).ready(function() {
    load();
});

function load() {
    if(localStorage['installed'] === 'true') {
        setMonstor(localStorage['remain']);
    }else{
        setTimeout(load, 1000);
        $('.update-time').text('Loading...');
    }
}