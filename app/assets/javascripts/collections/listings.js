ScareBnb.Collections.Listings = Backbone.Collection.extend({
	url: "/api/listings",
	model: ScareBnb.Models.Listing
	
});

ScareBnb.Collections.listings = new ScareBnb.Collections.Listings()