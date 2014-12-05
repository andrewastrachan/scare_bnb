ScareBnb.Views.Trips = Backbone.View.extend({
	template: JST['reservation/trips'],

	initialize: function() {
		this.listenTo(this.collection, "sync remove", this.render)
	}, 

	render: function() {
		var content = this.template({reservations: this.collection})
		this.$el.html(content)

		return this;
	}
});