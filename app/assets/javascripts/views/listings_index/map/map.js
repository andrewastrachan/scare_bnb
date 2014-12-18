ScareBnb.Views.Map = Backbone.View.extend({
	template: JST["index/map"],
	
	initialize: function() {
		this.listenTo(this.collection, "add remove", this.updateMap);
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
			var longitude = bounds.lng();
			var latitude = bounds.lat();
			var newLatLng = new google.maps.LatLng(latitude, longitude);
			that._map.setCenter(newLatLng);
		});
	},
	
	//MAP MAIN
	
	setMap: function(){
		var mapOptions = {
		          center: { lat: locationSearchFilter.lat, lng: locationSearchFilter.lng},
		          zoom: 14
							// styles: mapStylez
		        };
		var domElement = this.$('#map-canvas');				
		this._map = new google.maps.Map(domElement.get(0), mapOptions);
		// map = this._map
		this._markers = [];
		this.attachMapSearchBox();

		//only listen for idle on inital load... screws with map windows otherwise
		google.maps.event.addListenerOnce(this._map, 'idle', this.setMapFilters.bind(this));
		google.maps.event.addListener(this._map, 'dragend', this.setMapFilters.bind(this));

			
		//register event listener
	},
	
	setMapFilters: function() {
		
		var latx = this._map.getBounds().getNorthEast().lat()
		var lngy = this._map.getBounds().getNorthEast().lng()
		
		var laty = this._map.getBounds().getSouthWest().lat()
		var lngx = this._map.getBounds().getSouthWest().lng()
		
		
		//not DRY, i know
		ScareBnb.Collections.listings.filters.latx = latx;
		ScareBnb.Collections.listings.filters.laty = laty;
		ScareBnb.Collections.listings.filters.lngx = lngx;
		ScareBnb.Collections.listings.filters.lngy = lngy;
	 
		ScareBnb.Collections.listings.updateFilters();
		this.updateMap();
	 },
	 
	 //also handles map marker

	 window: function() {
	 	if (typeof this._window === "undefined") {
	 		this._window = new ScareBnb.Views.MapWindow()
	 	}
	 	
	 	return this._window
	 },

	 setWindow: function(marker, model) { 
	 	this.window().marker = marker;
		this.window().model = model;
		this.window().map = this._map;
		this.window().createWindow();
	 },
	 
	 updateMap: function() {
		 //removes window if there is one in exitence
		 this._window && this._window.remove();
		 var that = this
		 this.deleteMarkers()
		 this.collection.forEach(function(model){
				var marker = new google.maps.Marker({
				      position: { lat: model.get('latitude'), lng: model.get('longitude')},
				      title: model.get('title'),
				  });

				google.maps.event.addListener(marker, 'click', function() {
					that.setWindow(marker, model)
				});
					

					//sets window to instance
					
					
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
