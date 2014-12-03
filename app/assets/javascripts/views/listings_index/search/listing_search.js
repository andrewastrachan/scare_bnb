ScareBnb.Views.ListingSearch = Backbone.CompositeView.extend ({
	template: JST["index/search_page"],
	
	initialize: function(){
		this.listenTo(ScareBnb.Collections.listings, "sync", this.updateColl)
	},
	
	updateColl: function(){
		ScareBnb.Collections.listings.updateFilters()
	},
	
	addMap: function(){
		this._mapShow = new ScareBnb.Views.Map({
			collection: this.collection
		})
		this.addSubview(".map", this._mapShow)
	},
	
	addListings: function(){
		var listingsIndex = new ScareBnb.Views.ListingsIndex({collection: this.collection});
		this.addSubview(".lists", listingsIndex);
	},
	
	addSlider: function() {
		var sliderView = new ScareBnb.Views.Slider();
		this.addSubview(".bells-and-whistles", sliderView);
	},
	
	addCheckboxes: function() {
		var checkboxView = new ScareBnb.Views.Checkboxes();
		this.addSubview(".checkboxes", checkboxView)
	},
	
	addReservationFilters: function() {
		var reservationFilterView = new ScareBnb.Views.ReservationFilters();
		this.addSubview(".reservation-filters", reservationFilterView) 
	},
	
	render: function(){
		console.log('rendering search index');
		var content = this.template();
		this.$el.html(content);
		
		this.attachSubviews();
		return this;	
	},
	
	onRender: function () {
		console.log('onRender search index');
		this.addListings();
		this.addMap();
		this.addSlider();
		this.addCheckboxes();
		this.addReservationFilters();
		this._mapShow.setMap();
		
	}
	
});