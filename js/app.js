var myPosition;
function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: { lat: 39.7392, lng: -104.9903 }
    });
    var geocoder = new google.maps.Geocoder;
    var infoWindow = new google.maps.InfoWindow;
    directionsDisplay.setMap(map);

    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        
        navigator.geolocation.getCurrentPosition(function (position) {
            position = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
                
            };
            myPosition = position
            console.log(position.lat);
            console.log(position.lng);
            infoWindow.setPosition(position);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(position);

            console.log(position);

            var onChangeHandler = function () {
                calculateAndDisplayRoute(directionsService, directionsDisplay);
            };
        
            // geocodeLatLng(geocoder, map, infoWindow);
            onChangeHandler();
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    function handleLocationError(browserHasGeolocation, infoWindow, position) {
        infoWindow.setPosition(position);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }

    
}

// console.log("standalone lat: ", myPosition.lat);
// console.log("stnadalone lng: ", myPosition.lng);

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
        origin: {lat: myPosition.lat, lng: myPosition.lng},
        destination: $("#end").text(),
        travelMode: 'WALKING'
    }, function (response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    })};

    console.log($("#start").text());
    console.log($("#end").text());
    console.log("hi")