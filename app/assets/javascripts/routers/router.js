ScareBnb.Routers.Router = Backbone.Router.extend({
	
	initialize: function(options) {
		this.$rootEl = options.$rootEl
	},
	
	routes: {
		"":"search",
		"listings/:id":"showListing"
	},
	
	search: function(){
		var listingsView = new ScareBnb.Views.ListingSearch({
			collection: ScareBnb.Collections.listings.filtered()
		});
		this._swapView(listingsView)
		ScareBnb.Collections.listings.fetch({
			success: function(){
				ScareBnb.Collections.listings.updateFilters();
			}
		})
	},
	
	showListing: function(id) {
		var listing = ScareBnb.Collections.listings.getOrFetch(id);
		var listingView = new ScareBnb.Views.ListingShow({
			model: listing
		});
		
	},
	
	_swapView: function(view) {
		if (this._currentView) {
			this._currentView.remove()
		}
		this._currentView = view;
		this.$rootEl.html(this._currentView.render().$el)
	}
	
	
	
});