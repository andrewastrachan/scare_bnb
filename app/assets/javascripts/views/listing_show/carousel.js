ScareBnb.Views.Carousel = Backbone.View.extend({
	className: "photo-container",
	template: JST["show/carousel"],
	
	initialize: function() {
		
	},
	
	setCarousel: function() {
		this._carousel = this.$("#show-carousel").owlCarousel({
	        slideSpeed : 300,
	        paginationSpeed : 400,
	        singleItem:true
		});

	},
	
	render: function() {
		var content = this.template({images: this.collection});
		this.$el.html(content);
		
		this.setCarousel();
		
		return this;
	}
}); 