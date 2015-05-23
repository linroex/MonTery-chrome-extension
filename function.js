function showNotification(title, message) {
    var options = {
        type: 'basic',
        title: title,
        message: message,
        iconUrl: 'icon.png'
    };

    chrome.notifications.create('', options);
}