ScareBnb.Views.ListingItem = Backbone.View.extend({
	template: JST["index/listing_item"],
	
	setCarousel: function() {
		this._carousel = this.$("#show-carousel").owlCarousel({
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem:true
		});

	},
	
	render: function() {
		var content = this.template({listing: this.model, images: this.model.images()});
		this.$el.html(content);
		this.setCarousel();
		
		return this;
	}
});