$(document).ready(function(){
    localStorage['level'] = 0;
    setInterval(NotifyUsed, 1000*60*5);
    setInterval(CronGetData, 1000*60*5);
});
