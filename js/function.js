function showNotification(title, message) {
    var options = {
        type: 'basic',
        title: title,
        message: message,
        iconUrl: 'images/icon.png'
    };

    chrome.notifications.create('', options);
}

// author by nispc
function getRegion(city) {
    
    var list = ['金門縣',
        '連江縣', '宜蘭縣', '新北市',
        '台北市', '基隆市', '桃園市',
        '新竹縣', '新竹市', '苗栗縣',
        '台中市', '彰化縣', '南投縣',
        '雲林縣', '嘉義縣', '嘉義市',
        '台南市', '高雄市', '澎湖縣',  
        '屏東縣', '台東縣', '花蓮縣' 
    ];

    var index = list.indexOf(city);

    if(index >= 20)
        return 'east';
    if(index >= 13)
        return 'south';
    if(index >= 9)
        return 'central';
    return 'north';
}

function init(callback) {
    navigator.geolocation.getCurrentPosition(function(location){
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({'latLng': new google.maps.LatLng(
                location.coords.latitude, 
                location.coords.longitude
            )}, function(response, status){

                if(status === google.maps.GeocoderStatus.OK) {
                    var region = getRegion(response[0].address_components[4].long_name);
                    localStorage['region'] = region;
                    callback();
                }
        });
    });
}

function setPopupData() {
    $.getJSON("http://montery.ntust.me", {region: localStorage['region']}, function(response){
        var remain = response.data[0].now.remain_region;
        var num = (1 - remain).toFixed(2)*100;
        $(".used").text(num + "%");
        
        if(remain >= 0.1){
            $("#monster").css("background-image", "url('images/monster1.svg')");
        }else if(remain <= 0.1 && remain >= 0.06){
            $("#monster").css("background-image", "url('images/monster2.svg')");
        }else{
            $("#monster").css("background-image", "url('images/monster3.svg')");
        }
    });
}

function NotifyUsed() {
    $.getJSON("http://montery.ntust.me", {region: localStorage['region']}, function(response){
        var remain = response.data[0].now.remain_region.toFixed(2)*100;
        var num = 100 - remain;
        $(".used").text(num + "%");

        showNotification("目前電力狀態", "剩餘備轉容量：" + remain.toFixed(2) + "%\n目前狀態：" + getLevelMessage(remain));
        
    });
}

function getLevelMessage(remain) {
    if(remain >= 10){
        return "供電充裕";
    }else if(remain < 10 && remain >= 6){
        return "供電吃緊";
    }else{
        return "供電警戒";
    }
}