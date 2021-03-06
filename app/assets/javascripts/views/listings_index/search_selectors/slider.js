ScareBnb.Views.Slider = Backbone.View.extend ({
	template: JST["index/bells_and_whistles"],
	
	changeFilter: function(event) {
		var lowerRange = this.getRangeInt($('#span-lower').html());
		var upperRange = this.getRangeInt($('#span-upper').html());
		ScareBnb.Collections.listings.filters.lowerRange = lowerRange;
		ScareBnb.Collections.listings.filters.upperRange = upperRange;
		ScareBnb.Collections.listings.updateFilters();

	},
	
	getRangeInt: function(num){
		return parseInt(num.substring(1));
	},
	
	setSliderEvents: function() {
		$(".slider").on({
			change: this.changeFilter.bind(this)
		});	
	},
	
	
	attachSlider: function() {
		$(".slider").noUiSlider({
			start: [1, 1000],
			connect: true,
			step: 10,
			range: {
				'min': 1,
				'max': 1000
			},
			format: {
				  to: function ( value ) {
					return '$' + parseInt(value);
				  },
				  from: function ( value ) {
					return value.replace(',-', '');
				  }
				}
		});
		
		$(".slider").Link('lower').to($('#span-lower'));
		$(".slider").Link('upper').to($('#span-upper'));
		
		this.setSliderEvents()
	},
	
	render: function() {
		var content = this.template();
		this.$el.html(content);

    setTimeout(this.attachSlider.bind(this),0)

		return this;
	}
});