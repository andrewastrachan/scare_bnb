ScareBnb.Views.Navbar = Backbone.View.extend({
	template: JST["navbar/navbar"],
		
	render: function() {
		var content = this.template();
		this.$el.html(content);
		
		return this;
	},
	
}); 