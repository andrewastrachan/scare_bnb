ScareBnb.Views.ReservationFilters = Backbone.View.extend ({
	template: JST["index/reservation_filters"],
	
	attachSelectMenu: function() {
		this._selectMenu = this.$(".max-guest-list").selectmenu({
			width: '40px'
		});   
		that = this; 
		
		this._selectMenu.on( "selectmenuchange", function( event, ui ) {
			var maxGuests = parseInt(ui.item.label)
			ScareBnb.Collections.listings.filters.maxGuests = maxGuests;
			
			ScareBnb.Collections.listings.updateFilters();
		});
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
			this.filterMeDates();
		}
	},
	
	filterMeDates: function() {
		ScareBnb.Collections.listings.filters.startDate = this._startDate;
		ScareBnb.Collections.listings.filters.endDate = this._endDate;
		ScareBnb.Collections.listings.updateFilters();
	},
	
	render: function() {
		var content = this.template();
		this.$el.html(content);
		this.attachCalendars();
		this.attachSelectMenu();
		
		return this;
	}

});