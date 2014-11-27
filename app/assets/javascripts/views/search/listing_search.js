ScareBnb.Views.ListingSearch = Backbone.CompositeView.extend ({
	template: JST["search_page"],
	
	initialize: function(){
		this.listenTo(ScareBnb.Collections.listings, "sync", this.updateColl)
	},
	
	updateColl: function(){
		ScareBnb.Collections.listings.updateFilters()
	},
	
	attachMap: function(){
		var mapShow = new ScareBnb.Views.Map({collection: this.collection})
		this.addSubview(".map", mapShow)
	},
	
	attachListings: function(){
		var listingsIndex = new ScareBnb.Views.ListingsIndex({collection: this.collection});
		this.addSubview(".lists", listingsIndex);
	},
	
	render: function(){
		var content = this.template();
		this.$el.html(content);
		this.attachListings();
		this.attachMap();
		return this;	
	}
	
});