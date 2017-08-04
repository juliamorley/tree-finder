function getTrees(callback) {
    $.getJSON('https://data.cityofnewyork.us/resource/5rq2-4hqu.json', callback)
}

function initializeMap() {
    var mapOptions = {
        center: new google.maps.LatLng(40.7829, -73.9654),
        zoom: 11,
    };

    var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);


    getTrees(function (data) {
        var tree, LatLng;
        for (i in data) {
            tree = data[i];
            console.log(tree, i, "iii");
            LatLng = new google.maps.LatLng(tree.latitude, tree.longitude);
            var marker = new google.maps.Marker({
                position: LatLng,
                title: tree.spc_common,
                map: map
            })
        }

    })
};