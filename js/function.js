function showNotification(title, message) {
    var options = {
        type: 'basic',
        title: title,
        message: message,
        iconUrl: '../icon.png'
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

function init() {
    navigator.geolocation.getCurrentPosition(function(location){
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({'latLng': new google.maps.LatLng(
                location.coords.latitude, 
                location.coords.longitude
            )}, function(response, status){

                if(status === google.maps.GeocoderStatus.OK) {
                    var region = getRegion(response[0].address_components[4].long_name);
                    console.log(response[0].address_components[4].long_name);
                    console.log(region);
                    localStorage['region'] = region;
                }
        });
    });
}

function setPopupData() {
    // console.log(localStorage['region']);
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
