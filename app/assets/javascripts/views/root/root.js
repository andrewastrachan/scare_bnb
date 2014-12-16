ScareBnb.Views.Root = Backbone.View.extend({
	template: JST['root/root'],

	initialize: function() {

	}, 
	
	// attachMapSearchBox: function() {
	// 	debugger;
	// 	// 	  var input = document.getElementById('map-search');

	// },

	render: function() {
		var content = this.template();
		this.$el.html(content);
		this.attachSearchBox();
		
		
		return this;
	},
	
	attachSearchBox: function() {
		var input = this.$('#map-search');
	  var searchBox = new google.maps.places.Autocomplete(input[0]);
		var that = this;
		// debugger;
		google.maps.event.addListener(searchBox, 'place_changed', function() {
			debugger;
			var bounds = this.getPlace().geometry.location;
			locationSearchFilter.lng = bounds.lng();
			locationSearchFilter.lat = bounds.lat();
			Backbone.history.navigate("", {trigger: true})
		});
	}
});