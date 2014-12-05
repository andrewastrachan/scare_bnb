ScareBnb.Routers.Router = Backbone.Router.extend({
	
	initialize: function(options) {
		this.$rootEl = options.$rootEl
	},
	
	routes: {
		"":"search",
		"listings/:id":"showListing",
		"requests":"showRequests"
	},
	
	search: function(){
		this._listingsView = new ScareBnb.Views.ListingSearch({
			collection: ScareBnb.Collections.listings.filtered()
		});
		this._swapView(this._listingsView)
		
		ScareBnb.Collections.listings.fetch({
			success: function(){
				ScareBnb.Collections.listings.updateFilters();
			}
		});
	},
	
	showListing: function(id) {
		var listing = ScareBnb.Collections.listings.getOrFetch(id);
		this._listingView = new ScareBnb.Views.ListingShow({
			model: listing
		});
		
		this._swapView(this._listingView);
	},

	showRequests: function() {
		var requests = new ScareBnb.Collections.Reservations();
		this._requestsView = new ScareBnb.Views.Reservations({
			collection: requests
		});
		this._swapView(this._requestsView)
		requests.fetch()
	},
	
	_swapView: function(view) {
		if (this._currentView) {
			this._currentView.remove()
		}
		this._currentView = view;
		this.$rootEl.html(this._currentView.render().$el);
		
		view.onRender && view.onRender();
	}
	
	
	
});