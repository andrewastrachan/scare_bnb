ScareBnb.Views.MapWindow = Backbone.View.extend({
	
	template: JST["map_win"],
	
	initialize: function(options) {
		this.marker = options.marker
		this.map = options.map
		this.model = options.model

		this.attachListener();
	},
	
	attachListener: function() {
		that = this;
	  this.infoWindow = new google.maps.InfoWindow({
			content: that.template({listing: that.model})
	  });
	
		google.maps.event.addListener(this.marker, 'click', function() {
			that.infoWindow.open(that.map, that.marker);
		});
	},
}); 