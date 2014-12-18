ScareBnb.Views.Trips = Backbone.CompositeView.extend({
	template: JST['reservation/trips'],

	initialize: function() {
		this.listenTo(this.collection, "sync remove", this.render)
	}, 

	addNavbar: function() {
		var navbarView = new ScareBnb.Views.Navbar();
		this.addSubview(".navbar-vw", navbarView);
	},
	
	attachSearchBox: function() {
		var input = this.$('#search-box');
	  var searchBox = new google.maps.places.Autocomplete(input[0]);
		var that = this;
		google.maps.event.addListener(searchBox, 'place_changed', function() {
			var bounds = this.getPlace().geometry.location;
			locationSearchFilter.lng = bounds.lng();
			locationSearchFilter.lat = bounds.lat();
			Backbone.history.navigate("", {trigger: true})
		});
	},

	render: function() {
		var content = this.template({reservations: this.collection})
		this.$el.html(content)
		this.addNavbar();
		this.attachSearchBox();
		
		return this;
	}
});