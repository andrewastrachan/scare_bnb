ScareBnb.Views.Checkboxes = Backbone.View.extend({
	
	template: JST["checkboxes"],
	
	setCheckboxEvents: function() {
		//what happens when a box is clicked? 
		//calls event which changes filters
		//filters are for room type
	},
	
	setupCheckboxes: function() {
		//set the events
		this.setCheckboxEvents();
		//set the inital state
		
		
	},
	
	render: function(){
		var content = this.template();
		this.$el.html(content);
		this.setupCheckboxes();
		
		return this;
	}
	
});