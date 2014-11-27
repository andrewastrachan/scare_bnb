ScareBnb.Views.Map = Backbone.View.extend({
	template: JST["map"],
	
	initialize: function() {
		this.listenTo(this.collection, "sync", this.printBounds)
		// listen to the map. When it goes idle, get lat/long and call updateCollection
	},
	
	printBounds: function() {
		console.log(this._map.getBounds())
	},
	
	setMap: function(){
		var mapOptions = {
		          center: { lat: 37.781056, lng: -122.411455},
		          zoom: 16
		        };
		var domElement = this.$('#map-canvas');				
		this._map = new google.maps.Map(domElement.get(0), mapOptions);
	
		this._markers = []
	
		var that = this
		google.maps.event.addListener(this._map, 'idle', this.setMapFilters.bind(this))

			
		//register event listener
	},
	
	setMapFilters: function() {
		var latx = this._map.getBounds()["Ea"]["j"];
		var laty = this._map.getBounds()["Ea"]["k"];
		var lngx = this._map.getBounds()["va"]["j"];
		var lngy = this._map.getBounds()["va"]["k"];
		
		//not DRY, i know
		ScareBnb.Collections.listings.filters.latx = latx
		ScareBnb.Collections.listings.filters.laty = laty
		ScareBnb.Collections.listings.filters.lngx = lngx
		ScareBnb.Collections.listings.filters.lngy = lngy
	 
		ScareBnb.Collections.listings.updateFilters()
		this.updateMap()
	 },
	 
	 updateMap: function() {
		 that = this
		 this.deleteMarkers()
		 	this.collection.forEach(function(model){
				var marker = new google.maps.Marker({
				      position: { lat: model.get('latitude'), lng: model.get('longitude')},
				      title: model.get('title')
				  });
				that._markers.push(marker)	
		 	});
			this.showMarkers()
	 },
	 
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
	
	updateCollection: function () {
		// get lat/long from map
		// define filter function based on lat/long
		// call filter on this.collection, passing in filter function
		// set this.collection
	}
}); 