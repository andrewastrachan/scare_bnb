ScareBnb.Views.Map = Backbone.View.extend({
	template: JST["map"],
	
	initialize: function() {

	},
	
	render: function() {
		var content = this.template();
		this.$el.html(content);
	
		return this;
	}
}); 