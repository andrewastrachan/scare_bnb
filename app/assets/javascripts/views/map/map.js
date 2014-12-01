ScareBnb.Views.Map = Backbone.View.extend({
	template: JST["map"],
	
	initialize: function() {
		this.listenTo(this.collection, "add remove", this.updateMap)
		// listen to the map. When it goes idle, get lat/long and call updateCollection

	},

	//SEARCHBOX
	
	attachMapSearchBox: function() {
	  var input = document.getElementById('search-box');
	  var searchBox = new google.maps.places.Autocomplete(input);

		var that = this;
		google.maps.event.addListener(searchBox, 'place_changed', function(locationObj) {
			google.maps.event.addListenerOnce(that._map, 'idle', that.setMapFilters.bind(that));
			var bounds = this.getPlace().geometry.location;
			var longitude = bounds.B;
			var latitude = bounds.k;
			var newLatLng = new google.maps.LatLng(latitude, longitude);
			that._map.setCenter(newLatLng);
		});
	},
	
	//MAP MAIN
	
	setMap: function(){
		var mapOptions = {
		          center: { lat: 37.781056, lng: -122.411455},
		          zoom: 14,
							styles: mapStylez
		        };
		var domElement = this.$('#map-canvas');				
		this._map = new google.maps.Map(domElement.get(0), mapOptions);
	
		this._markers = [];
		this.attachMapSearchBox();

		//only listen for idle on inital load... screws with map windows otherwise
		google.maps.event.addListenerOnce(this._map, 'idle', this.setMapFilters.bind(this));
		google.maps.event.addListener(this._map, 'dragend', this.setMapFilters.bind(this));

			
		//register event listener
	},
	
	setMapFilters: function() {
		var latx = this._map.getBounds()["Ea"]["j"];
		var laty = this._map.getBounds()["Ea"]["k"];
		var lngx = this._map.getBounds()["va"]["j"];
		var lngy = this._map.getBounds()["va"]["k"];
		
		//not DRY, i know
		ScareBnb.Collections.listings.filters.latx = latx;
		ScareBnb.Collections.listings.filters.laty = laty;
		ScareBnb.Collections.listings.filters.lngx = lngx;
		ScareBnb.Collections.listings.filters.lngy = lngy;
	 
		ScareBnb.Collections.listings.updateFilters();
		this.updateMap();
	 },
	 
	 //also handles map marker
	 
	 updateMap: function() {
		 //removes window if there is one in exitence
		 this._window && this._window.remove();
		 var that = this
		 this.deleteMarkers()
		 	this.collection.forEach(function(model){
				var marker = new google.maps.Marker({
				      position: { lat: model.get('latitude'), lng: model.get('longitude')},
				      title: model.get('title')
				  });
					
					//sets window to instance
					that._window = new ScareBnb.Views.MapWindow({model: model, map: that._map, marker: marker})
					
				that._markers.push(marker)	
		 	});
			this.showMarkers()
	 },
	 
	 //MARKERS
	 
	 // Sets the map on all markers in the array.
	 setAllMap: function(map) {
	   for (var i = 0; i < this._markers.length; i++) {
	     this._markers[i].setMap(map);
	   }
	 },

	 // Removes the markers from the map, but keeps them in the array.
	 clearMarkers: function() {
	   this.setAllMap(null);
	 },

	 // Shows any markers currently in the array.
	 showMarkers: function() {
	   this.setAllMap(this._map);
	 },

	 // Deletes all markers in the array by removing references to them.
	 deleteMarkers: function() {
	   this.clearMarkers();
	   this._markers = [];
	 },
		
	render: function() {
		var content = this.template();
		this.$el.html(content);
		if (!this._map) {
			this.setMap();
		}
		return this;
	},
	
}); 

var mapStylez = [
    {
        "featureType": "water",
        "stylers": [
            {
                "color": "#0e171d"
            }
        ]
    },
    {
        "featureType": "landscape",
        "stylers": [
            {
                "color": "#1e303d"
            }
        ]
    },
    {
        "featureType": "road",
        "stylers": [
            {
                "color": "#1e303d"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "stylers": [
            {
                "color": "#1e303d"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "color": "#182731"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
            {
                "color": "#f0c514"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1e303d"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#e77e24"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#94a5a6"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#e84c3c"
            }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            {
                "color": "#e84c3c"
            },
            {
                "visibility": "off"
            }
        ]
    }
]