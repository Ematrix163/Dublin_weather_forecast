/*This code is to display google map on the page.
    Code references: https://www.w3schools.com/graphics/tryit.asp?filename=trymap_overlays_animate */
function myMap() {
    var mapCanvas = document.getElementById("map");
    var myCenter = new google.maps.LatLng(53.3498, -6.2603);
    var mapOptions = {
        center: myCenter,
        zoom: 7
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);
    var marker = new google.maps.Marker({
        position: myCenter,
        animation: google.maps.Animation.BOUNCE
    });
    marker.setMap(map);
}