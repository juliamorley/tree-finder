// function initializeMap() {
//     var mapOptions = {
//         center: new google.maps.LatLng(40.7829, -73.9654),
//         zoom: 11,
//     };

//     var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);


//     $.ajax({
//         url: "https://data.cityofnewyork.us/resource/5rq2-4hqu.json",
//         type: "GET",
//         data: {
//             "$limit": 10
//         },
//         dataType: "json",
//     }).done(function (data) {
//         var tree, LatLng;
//         for (i in data) {
//             tree = data[i];
//             LatLng = new google.maps.LatLng(tree.latitude, tree.longitude);
//             var marker = new google.maps.Marker({
//                 position: LatLng,
//                 title: tree.spc_common,
//                 map: map
//             })
//         }

//     });
// }


