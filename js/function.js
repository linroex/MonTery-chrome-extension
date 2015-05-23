function showNotification(title, message) {
    var options = {
        type: 'basic',
        title: title,
        message: message,
        iconUrl: '../icon.png'
    };

    chrome.notifications.create('', options);
}

function getData() {
    navigator.geolocation.getCurrentPosition(function(location){
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({'latLng': new google.maps.LatLng(
                location.coords.latitude, 
                location.coords.longitude
            )}, function(response, status){
                if(status === google.maps.GeocoderStatus.OK) {
                    console.log(response[0].address_components[4].long_name);
                }
        });
    });
    
}
