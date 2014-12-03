ScareBnb.Views.MapWindow = Backbone.View.extend({
	
	template: JST["index/map_win"],
	
	setCarousel: function() {

		this._carousel = window.$("#show-carousel").owlCarousel({
	      paginationSpeed : 400,
	      singleItem:true
		});
	},

	createWindow: function() {

		if (typeof this.infoWindow !== "undefined") {
			this.infoWindow.close();
		}

		var that = this;
		var windowContent = this.template({listing: this.model, images: this.model.images()});
		this.$el.html(windowContent);

		this.infoWindow = new google.maps.InfoWindow({
			content: this.$el.html()
	  	});

	  	this.infoWindow.open(this.map, this.marker);

		google.maps.event.addListener(this.infoWindow, 'domready', function(){
			that.setCarousel()
		}); 
	}

}); 