ScareBnb.Views.ReservationFilters = Backbone.View.extend ({
	template: JST["reservation_filters"],
	
	initialize: function() {
		
	},
	
	attachCalendars: function() {
   	this._startingCalendar = this.$( "#start-calendar" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 1,
      onClose: function( selectedDate ) {
        $( "#end-calendar" ).datepicker( "option", "minDate", selectedDate );
      },
			onSelect: this.parseDate.bind(this)
    });
    this._endingCalendar = this.$( "#end-calendar" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 1,
      onClose: function( selectedDate ) {
        $( "#start-calendar" ).datepicker( "option", "maxDate", selectedDate );
      },
			onSelect: this.parseDate.bind(this)
		});
	},
	
	parseDate: function(dateInf, dateObj){
		if (dateObj.id === "start-calendar") {
			this._startDate = dateInf;
		} else {
			this._endDate = dateInf;
		}
		
		if (this._startDate && this._endDate) {
			this.filterMeDates
		}
	},
	
	filterMeDates: function() {
		
	},
	
	render: function() {
		var content = this.template();
		this.$el.html(content);
		this.attachCalendars();
		
		return this;
	}

});