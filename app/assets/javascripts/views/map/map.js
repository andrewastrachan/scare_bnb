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
		var domElement = this.$('#map-canvas')				
		this._map = new google.maps.Map(domElement.get(0), mapOptions);
		
		var that = this
		google.maps.event.addListener(this._map, 'idle', function() {
		    // 3 seconds after the center of the map has changed, pan back to the
		    // marker.
			debugger
			// ShareBnb.Collections.listings
			 console.log("latx:" + that._map.getBounds()["Ea"]["j"])
			 console.log("laty:" + that._map.getBounds()["Ea"]["k"])
			 console.log("lngx:" + that._map.getBounds()["va"]["j"])
			 console.log("lngy:" + that._map.getBounds()["va"]["k"])
		  });
		//register event listener
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