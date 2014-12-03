ScareBnb.Views.ListingsIndex = Backbone.CompositeView.extend({
	template: JST["index/listing_index"],
	
	initialize: function() {
		this.listenTo(this.collection, "add remove", this.render)
		this.listenTo(this.collection, "add remove", this.render)
	},
	
	garbageCollect: function() {
		var subviews = this.subviews(".sidebar-lists");
		var that = this;
			if (subviews) {
				subviews.forEach(function(subview){
					that.removeSubview(".sidebar-lists", subview);
				})
			}
	},
	
	doViews: function() {
		var that = this
		this.collection.forEach(function(model){
			var listingItemView = new ScareBnb.Views.ListingItem({
				model: model
			});
			that.addSubview(".sidebar-lists", listingItemView);
		});
	},
	
	render: function() {
		var content = this.template();
		this.$el.html(content);
		this.garbageCollect();
		this.doViews();
		
		return this;
	}
}); 