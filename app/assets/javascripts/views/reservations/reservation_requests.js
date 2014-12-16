ScareBnb.Views.Reservations = Backbone.CompositeView.extend({
	template: JST['root'],

	initialize: function() {
	}, 

	events: {
	},

	render: function() {
		var content = this.template({})
		this.$el.html(content)

		return this;
	}
});