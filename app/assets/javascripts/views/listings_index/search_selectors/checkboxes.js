ScareBnb.Views.Checkboxes = Backbone.View.extend({
	
	template: JST["index/checkboxes"],
	
	changeFilter: function() {
		$boxes = this.$("[name='room-type']");
		var roomTypes = [];
		ScareBnb.Collections.listings.filters.roomTypes = [];
		debugger;
		for (var i = 0; i < $boxes.length; i++){
			var setClass = $boxes[i].attributes.class;
			var roomType = $boxes[i].value;	
			if ((typeof setClass != "undefined") && (setClass.value === "selected")) {
				roomTypes.push(roomType);
			} 
		}
		ScareBnb.Collections.listings.filters.roomTypes = roomTypes;
		ScareBnb.Collections.listings.updateFilters();
	},
	
	setCheckboxEvents: function() {
		var that = this;
    this.$('#type-filters').on('change', 'input[type=checkbox]', function(event) {
			$(event.currentTarget).toggleClass('selected');
			that.changeFilter();
    });
	},
	
	render: function(){
		var content = this.template();
		this.$el.html(content);
		this.setCheckboxEvents();
		
		return this;
	}
	
});