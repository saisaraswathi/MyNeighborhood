var map;

// Initialize Google Map
// initMap automatically called by the Google Maps API script during async defer
function initMap() {
    var dtIN = {
        lat: 21.7679,
        lng: 78.8718
    };

    function setMap(callback) {
        map = new google.maps.Map(document.getElementById('map'), {
            center: dtIN,
            zoom: 5
        });
        callback();
    }
    // call setMap and, after map is rendered, call Knockout bindings via new MyApp()
    setMap(function() {
        ko.applyBindings(new MyApp());
    });
}
//Error handling function that alerts user if Google Map scripts cannot be loaded
function googleError() {
    alert("Failed to load Google Maps. Please try again later.");
}

function MyApp(locationsArray) {
    var that = this;

    // Model (data)
    that.defaultLocations = [{
      name: " Tirumala Tirupathi",
      tags: "Balaji temple",
      position: { lat: 13.6288, lng: 79.4192 }
  }, {
      name: "Mumbai",
      tags: "Gate way",
      position: { lat: 19.0760, lng: 72.8777 }
  }, {
      name: "Ahmedhabad",
      tags: "Airport",
      position: { lat: 23.0225, lng: 72.5714 }
  }, {
      name: "Shiridi",
      tags: "Temple",
      position: { lat: 19.7669, lng: 74.4773 }
  }, {
      name: "orisaa",
      tags: "Dance",
      position: { lat: 19.8047, lng: 85.8180 }
  }, {
      name: "Palakol",
      tags: "shiva temple",
      position: { lat: 16.5175, lng: 81.7253 }
    }];


    this.searchLocations = [];
    this.flickerAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    this.flickrImagesObj = {};  //expecting an object
    this.infowin = null;

    this.markersArray = ko.observableArray();
    this.markersArrayTemp = ko.observableArray();
    this.markersArrayPermanent = ko.observableArray();

    this.userLoc = ko.observable(null);

    // ViewModel (methods)
    this.openInfoWindow = function(_marker) {
        var image = that.flickrImagesObj[_marker.title];

        if (that.infowin != null) {
            that.infowin.close();
        }

        that.infowin = new google.maps.InfoWindow({
            content: '<h5>' + _marker.windowContent + '</h5><div><img src="' + image + '"></div>'
        });

        that.infowin.open(map, _marker);
        _marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            _marker.setAnimation(null);
        }, 1400);
    };

    // https://developers.google.com/maps/documentation/javascript/examples/event-closure
    // http://stackoverflow.com/questions/5868903/marker-content-infowindow-google-maps

    // fill markers array
    this.defaultLocations.forEach(function(val, idx, arr) {
        var marker = new google.maps.Marker({
            position: val.position,
            animation: google.maps.Animation.DROP,
            map: map,
            display: true,
            title: val.name,
            windowContent: '<h5 class="infowindow-content">' + val.name + '</h5>'
        });

        $.getJSON(that.flickerAPI, {
            tags: val.tags,
            tagmode: "any",
            format: "json"
        })

        .done(function(data) {

            google.maps.event.addListener(marker, 'click', function() {
                //close any windows that may still be open
                if (that.infowin != null) {
                    that.infowin.close();
                }

                that.infowin = new google.maps.InfoWindow({
                    content: '<h5>' + marker.windowContent + '</h5><div><img src="' + data.items[5].media.m + '"></div>'
                });
                that.infowin.open(map, marker);
                marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function() {
                    marker.setAnimation(null);
                }, 1400);
            });

            that.markersArray.push(marker);
            that.markersArrayPermanent.push(marker);
            that.flickrImagesObj[marker.title] = data.items[5].media.m;
        })

        .fail(function(jqXHR, textStatus, errorThrown) {
            $('#locList').html('<h3>Request for Flickr resources failed. Please try again later.</h3>');
        });
    });

    this.showAll = function() {

        // Re-init markersArray by emptying it out, then push back all original
        // markers stored in markersArrayPermanent to create a fresh markersArray
        that.markersArray.removeAll();

        that.markersArrayPermanent().forEach(function(val, idx, arr) {
            if (that.infowin != null) {
                that.infowin.close();
            }

            val.display = true;
            val.setMap(map);
            that.markersArray.push(val);
        });
    };

    this.search = function(_userLoc) {
        // call showall, close info window, then check for non matches
        // when not-matched:
        // 1) remove marker from map by setting map to null,
        // 2) change marker's property val.display = false
        // which will change its display to 'none' (in html, data-bind="style = .. ")
        this.showAll();
        that.markersArrayTemp.removeAll();

        if (that.infowin != null) {
            that.infowin.close();
        }

        that.markersArray().forEach(function(val, idx, arr) {
            var lowercaseMarkerTitle = val.title.toLowerCase();
            var lowercaseUserInput = that.userLoc().toLowerCase();

            if (that.userLoc() === null || _userLoc === null) {
                this.showAll();
            } else if (lowercaseMarkerTitle.indexOf(lowercaseUserInput) === -1) {
                val.setMap(null);
                val.display = false;
                that.markersArrayTemp.push(val);
            } else {
                val.setMap(map);
                val.display = true;
                that.markersArrayTemp.push(val);
            }
        });

        that.markersArray.removeAll();

        that.markersArrayTemp().forEach(function(val, idx, arr) {
            that.markersArray.push(val);
        });
    };
}
