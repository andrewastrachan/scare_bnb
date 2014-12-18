ScareBnb.Views.Root = Backbone.View.extend({
	template: JST['root/root'],

	render: function() {
		var content = this.template();
		this.$el.html(content);
		this.attachSearchBox();
		this.attachDatepickers();
		
		return this;
	},
	
	attachDatepickers: function() {
		var that = this;
		this._datepicker = this.$('.input-daterange').datepicker({
	    startDate: "-infinity",
	    orientation: "bottom auto",
	    autoclose: true,
	    todayHighlight: true
		}).on('changeDate', that.parseDate.bind(that))
	},
	
	parseDate: function(ev){
		var target = ev.target.name;
		if (target === "start") {
			otherSearchFilters.startDate = ev.date;
		} else {
			otherSearchFilters.endDate = ev.date;
		} 
	},
	
	attachSearchBox: function() {
		var input = this.$('#map-search');
	  var searchBox = new google.maps.places.Autocomplete(input[0]);
		var that = this;
		google.maps.event.addListener(searchBox, 'place_changed', function() {
			var bounds = this.getPlace().geometry.location;
			locationSearchFilter.lng = bounds.lng();
			locationSearchFilter.lat = bounds.lat();
			Backbone.history.navigate("search", {trigger: true})
		});
	}
});