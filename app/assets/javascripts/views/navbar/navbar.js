ScareBnb.Views.Navbar = Backbone.View.extend({
	template: JST["navbar/navbar"],
	
	initialize: function() {
		this.listenTo(ScareBnb.Collections.users, "'sync add remove change reset'", this.render)
	},
		
	render: function() {
		var content = this.template({user: ScareBnb.Collections.users.currentUser()});
		this.$el.html(content);
		
		return this;
	},
	
}); 