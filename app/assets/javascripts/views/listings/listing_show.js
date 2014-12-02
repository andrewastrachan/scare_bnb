ScareBnb.Views.ListingShow = Backbone.View.extend({
	template: JST["listing_show"],
	
	initialize: function() {
		this.listenTo(this.model, "sync", this.render)
	},
	
	render: function() {
		var content = this.template();
		this.$el.html(content);
	
		return this;
	}
}); 