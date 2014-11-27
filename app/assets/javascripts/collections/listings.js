ScareBnb.Collections.Listings = Backbone.Collection.extend({
	url: "/api/listings",
	
	model: ScareBnb.Models.Listing,
	
	filtered: function () {
		if (!this._filtered) {
			this._filtered = new ScareBnb.Collections.Listings();
			this._filtered.set(this.models);
		}
		return this._filtered;
	},
	
	// collection.filtered();
	
	filters: {
		minLat: 0
	},
	
	updateFilters: function () {
		var models = this.filter(function (model) {this
			if (model.get('latitude') === 0) {
				return false;
			}
			return true;
		});
		return this.filtered().set(models);
	}
});

ScareBnb.Collections.listings = new ScareBnb.Collections.Listings()