ScareBnb.Views.ListingShow = Backbone.CompositeView.extend({
	template: JST["show/listing_show"],
	
	initialize: function() {
		this.listenTo(this.model, "sync", this.render)
	},
	
	attachCarousel: function() {
		var carouselView = new ScareBnb.Views.Carousel({collection: this.model.images()})
		this.addSubview(".carousel-container", carouselView)
	},
	
	render: function() {
		debugger
		var content = this.template({listing: this.model});
		this.$el.html(content);
		if (this.model.images()) {
			this.attachCarousel();
		}
		
		
		return this;
	}
}); 