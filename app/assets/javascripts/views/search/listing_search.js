ScareBnb.Views.ListingSearch = Backbone.CompositeView.extend ({
	template: JST["search_page"],
	
	initialize: function(){
		this.listenTo
	},
	
	attachMap: function(){
		var mapShow = new ScareBnb.Views.Map({collection: this.collection})
		this.addSubview(".map", mapShow)
	},
	
	attachListings: function(){
		var listingsIndex = new ScareBnb.Views.ListingsIndex({collection: this.collection});
		this.addSubview(".lists", listingsIndex);
	},
	
	seeMap: function() {
		var mapOptions = {
		          center: { lat: 37.781056, lng: -122.411455},
		          zoom: 16
		        };
		var domElement = this.$('#map-canvas')				
		this.map = new google.maps.Map(domElement.get(0), mapOptions);
		
	},
	
	render: function(){
		var content = this.template();
		this.$el.html(content);
		this.attachListings();
		this.attachMap();
		this.seeMap();
		return this;	
	}
	
});