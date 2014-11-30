ScareBnb.Views.Checkboxes = Backbone.View.extend({
	
	template: JST["checkboxes"],
	
	changeFilter: function() {
		$boxes = this.$("[name='room-type']");
		var roomTypes = [];
		ScareBnb.Collections.listings.filters.roomTypes = [];
		
		for (var i = 0; i < $boxes.length; i++){
			var setClass = $boxes[i].attributes.class;
			var roomType = $boxes[i].value;	
			if ((typeof setClass != "undefined") && (setClass.value === "selected")) {
				roomTypes.push(roomType);
			} 
		}
		debugger
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
	
	setupCheckboxes: function() {
		this.setCheckboxEvents();
	},
	
	render: function(){
		var content = this.template();
		this.$el.html(content);
		this.setupCheckboxes();
		
		return this;
	}
	
});