ScareBnb.Routers.Router = Backbone.Router.extend({
	
	initialize: function(options) {
		this.$rootEl = options.$rootEl
	},
	
	routes: {
		"":"search"
	},
	
	search: function(){
		var listingsView = new ScareBnb.Views.ListingSearch({
			collection: ScareBnb.Collections.listings
		});
		this._swapView(listingsView)
		ScareBnb.Collections.listings.fetch()
	},
	
	_swapView: function(view) {
		if (this._currentView) {
			this.currentView.remove()
		}
		this._currentView = view;
		this.$rootEl.html(this._currentView.render().$el)
		
	}
	
	
});