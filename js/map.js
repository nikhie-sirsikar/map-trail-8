var map;
//This is a blank array for all listing markers.
var markers = [];

//this is an array containg info of all the markers
//http://opensoul.org/2011/06/23/live-search-with-knockoutjs/
var locations = [{
        title: "Amrut Hotel Karwar",
        lat: 14.8090,
        lng: 74.1303,
        Address: "State Highway 6, Near Geethanjali Theater, Konekar Wada, Karwar, Karnataka 581301",
        visible: ko.observable(true),
        test: true,
    },
    {
        title: "LakeView Hotel Hubli",
        lat: 15.371598,
        lng: 75.101166,
        Address: "The Gateway Hotel Lakeside,Unkal Lake, Hubli, Karnataka 580025",
        visible: ko.observable(true),
        test: true,
    },
    {
        title: "Mysore Palace Mysuru",
        lat: 12.3051,
        lng: 76.6551,
        Address: "Sayyaji Rao Rd, Agrahara, Chamrajpura, Mysuru, Karnataka 570001",
        visible: ko.observable(true),
        test: true,
    },
    {
        title: "Hampi, Karnataka",
        lat: 15.3350,
        lng: 76.4600,
        Address: "Hampi, Karnataka 583239",
        visible: ko.observable(true),
        test: true,
    },
    {
        title: "Madikeri, Karnataka",
        lat: 12.4244,
        lng: 75.7382,
        Address: "Madikeri, Karnataka 571201",
        visible: ko.observable(true),
        test: true,
    },
    {
        title: "Udupi, Karnataka",
        lat: 13.3408807,
        lng: 74.7421427,
        Address: "Udupi, Karnataka 576101",
        visible: ko.observable(true),
        test: true,
    },
];

var largeInfowindow;

//this function is called when error occurs while loading the google map
var googleError = function() {
    alert('Error connecting to Google Maps. Please try again later.');
};

//https://developers.google.com/maps/documentation/javascript/markers
function initMap() {
    // Constructor creates a new Map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 21.7679, lng: 78.8718},
        zoom: 13,
        //https://developers.google.com/maps/documentation/javascript/styling
        styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
    });

    //These are real estate listings that will be shown.
    var locations = [
    {title: "Amrut Hotel Karwar", location: {lat: 14.8090, lng: 74.1303}},
    {title: "LakeView Hotel Hubli", location: {lat: 15.371598, lng: 75.101166}},
    {title: "Mysore Palace Mysuru", location: {lat: 12.3051, lng: 76.6551}},
    {title: "Hampi, Karnataka", location: {lat: 15.3350, lng: 76.4600}},
    {title: "Madikeri, Karnataka", location: {lat: 12.4244, lng: 75.7382}},
    {title: "Udupi, Karnataka", location: {lat: 13.3409, lng: 74.7421}},

    ];

    largeInfowindow = new google.maps.InfoWindow();


    //lat long bounds instance which captures the southwest and 
    //northeast corners of the view port.
    var bounds = new google.maps.LatLngBounds();
    //The following group uses the location array to create an array of markers on initialize.
    for (var i=0; i < locations.length; i++) {
        // Get the position from the location array.
        var position = locations[i].location;
        var title = locations[i].title;
        //Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id:i
        });
        //markers.push(marker);
        locations[i].marker = marker;
        // Push the marker to our array of markers.
        markers.push(marker);
        //Extend the boundaries of the map for each marker.
        bounds.extend(marker.position);
        //Create an onclick event to open an infowindow at each marker.
        marker.addListener("click", function() {
            populateInfoWindow(this, largeInfowindow);
        });
    }
        // Avoid manipulating the DOM with jQuery or Vanilla JavaScirp use ko data bindings instead
        // http://knockoutjs.com/documentation/binding-syntax.html
        document.getElementById("show-listings").addEventListener("click", showListings);
        document.getElementById("hide-listings").addEventListener("click", hideListings);

        ko.applyBindings(viewModel);


    //This function populates the infowindow when the marker is clicked.
    //We'll only allow one infowindow which will open at the marker
    //that is clicked, and populate based on that markers position.
    function populateInfoWindow(marker,infowindow) {
        //Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
            //Clear the infowindow content to give the streetview time to load.
            infowindow.setContent('<div>'+marker.title+'</div>');
            infowindow.marker = marker;
            //Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function() {
                infowindow.close(map, marker);
                //infowindow.marker = null;
            });
            var streetViewService = new google.maps.StreetViewService();
            var radius = 50;
            //In case the status is Ok, which means the pano was found,
            //compute the position of the streetview image, then calculate 
            //the heading, then get the panorama from that and set the options.
            //https://developers.google.com/maps/documentation/javascript/streetview
            function getStreetView(data, status) {
                if (status == google.maps.StreetViewStatus.OK) {
                    var nearStreetViewLocation = data.location.latLng;
                    var heading = google.maps.geometry.spherical.computeHeading(
                        nearStreetViewLocation, marker.position);
                    infowindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>');
                    var panoramaOptions = {
                        position: nearStreetViewLocation,
                        pov:  {
                            heading: heading,
                            pitch: 30
                        }
                    };
                    var panorama = new google.maps.StreetViewPanorama(
                        document.getElementById("pano"), panoramaOptions);
                } else {
                    infowindow.setContent("<div>" + marker.title + "</div>"+ 
                        "<div>No Street View Found</div>");
                }
            }
            // Use streetview service to get the closest streetview image
            //within 50 meters of the markers position
            streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
            //Open the infowindow on the correct marker.
            infowindow.open(map, marker);

            // http://knockoutjs.com/documentation/binding-syntax.html
            var $wikiElem = $('#wikipedia-links');
            // load wikipedia data
            var wikiUrl = "http://en.wikipedia.org/w/api.php?action=opensearch&search=" + marker.title + "$format=json&callback=wikiCallback";
            
            //error message
            var wikiRequestTimeout = setTimeout(function() {
                $wikiElem.text("failed to get Wikipedia resources");
            }, 8000);

            console.log("Wiki Request");

            // YOUR CODE GOES HERE!
            $.ajax({
                url: wikiUrl,
                dataType: "jsonp",
                //jsonp: "callback",
            }).done(function(response) {
                var articleList = response[1];
                var url = "http://en.wikipedia.org/wiki/" + marker.title;
                streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
                infowindow.setContent('<div>' + marker.title + '</div><br><a href ="' + url + '">' + url + '</a><hr><div id="pano"></div>');
            });

            infowindow.setContent("<div>" +marker.title + "</div>");
            // Open the infowindow on the correct marker.
            infowindow.open(map, marker);
            //Make sure the marker property is cleared if the infowindow is closed.
            //infowindow.addListener("closeclick", function() {
                //infowindow.setMarker(null);
            //});
        }
    }

    

    //This function will loop through the markers array and display them all.
    function showListings() {
        var bounds = new google.maps.LatLngBounds();
        //Extend the boundaries of the map for each marker and display the marker.
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
            //console.log(markers[i]);
            markers[i].setVisible(true);
            bounds.extend(markers[i].position);

        }
        map.fitBounds(bounds);
    }

    //This function will loop through the listings and hide them all.
    function hideListings() {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
    }

}



//Query through the different locations from nav bar with knockout.js.only display markers and nav elements that match query result
var viewModel = {
          query: ko.observable(''),
    marker: ko.observableArray(locations),
    clickHandlerFunction: function(locations) {
              largeInfowindow.setContent(location.contentString);
              largeInfowindow.open(map, location.placeMarker);
              map.setZoom(16);
              location.placeMarker.setAnimation(google.maps.Animation.BOUNCE);
              setTimeout(function(){ location.placeMarker.setAnimation(null);}, 700);
              map.setCenter(location.placeMarker.getPosition());
    }
};

viewModel.visible = ko.observable(true);

// Use better fitting names for variables and functions
viewModel.markers = ko.dependentObservable(function() {
    var self = this;
    var search = self.query().toLowerCase();
    return viewModel.marker().forEach( function(marker, i) {
        var userQueryIsInTitle = marker.title.toLowerCase().indexOf(search) >= 0; // true or false
        //console.log(i);
        //console.log(userQueryIsInTitle);

        marker.test = userQueryIsInTitle; // true or false
        marker.visible(userQueryIsInTitle); // true or false
        if (markers.length > 0 ) {
            markers[i].setVisible(userQueryIsInTitle); // true or false
        }
    });


}, viewModel);

 


function check() {
  setMap(markers,i);
    }