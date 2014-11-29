ScareBnb.Views.Slider = Backbone.View.extend ({
	template: JST["bells_and_whistles"],
	
	initalize: function() {
		
	},
	
	attachSlider: function() {
		$(".slider").noUiSlider({
			start: [20, 80],
			connect: true,
			range: {
				'min': 1,
				'max': 10000
			}
		});
	},
	
	render: function() {
		var content = this.template();
		this.$el.html(content);

    setTimeout(this.attachSlider.bind(this),0)

		return this;
	}
});