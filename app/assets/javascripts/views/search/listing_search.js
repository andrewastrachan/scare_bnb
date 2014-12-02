ScareBnb.Views.ListingSearch = Backbone.CompositeView.extend ({
	template: JST["index/search_page"],
	
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
	
	attachSlider: function() {
		var sliderView = new ScareBnb.Views.Slider();
		this.addSubview(".bells-and-whistles", sliderView);
	},
	
	attachCheckboxes: function() {
		var checkboxView = new ScareBnb.Views.Checkboxes();
		this.addSubview(".checkboxes", checkboxView)
	},
	
	attachReservationFilters: function() {
		var reservationFilterView = new ScareBnb.Views.ReservationFilters();
		this.addSubview(".reservation-filters", reservationFilterView) 
	},
	
	render: function(){
		var content = this.template();
		this.$el.html(content);
		this.attachListings();
		this.attachMap();
		this.attachSlider();
		this.attachCheckboxes();
		this.attachReservationFilters();
		return this;	
	}
	
});