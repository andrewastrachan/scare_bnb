ScareBnb.Views.MapWindow = Backbone.View.extend({
	
	template: JST["index/map_win"],
	
	initialize: function(options) {
		this.marker = options.marker
		this.map = options.map
		this.model = options.model

		this.attachListener();
	},
	
	setCarousel: function() {
		this._carousel = this.$("#show-carousel").owlCarousel({
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem:true
		});

	},
	
	attachListener: function() {
		that = this;
		var content = that.template({listing: that.model});
		this.$el.html(content);
		this.setCarousel();
		debugger;
		
	  this.infoWindow = new google.maps.InfoWindow({
			content: that.$el.html()
	  });
	
		google.maps.event.addListener(this.marker, 'click', function() {
			that.infoWindow.open(that.map, that.marker);
		});
	},
}); 