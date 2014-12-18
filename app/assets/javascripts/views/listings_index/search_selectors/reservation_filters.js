ScareBnb.Views.ReservationFilters = Backbone.View.extend ({
	template: JST["index/reservation_filters"],
	
	// attachSelectMenu: function() {
	// 	this._selectMenu = this.$(".max-guest-list").selectmenu({
	// 		width: '40px'
	// 	});
	// 	that = this;
	//
	// 	this._selectMenu.on( "selectmenuchange", function( event, ui ) {
	// 		var maxGuests = parseInt(ui.item.label)
	// 		ScareBnb.Collections.listings.filters.maxGuests = maxGuests;
	//
	// 		ScareBnb.Collections.listings.updateFilters();
	// 	});
	// },
	initialize: function() {
		this._startDate = otherSearchFilters.startDate;
		this._endDate = otherSearchFilters.endDate;
		this.filterMeDates();
	},
	
	attachDatepickers: function() {
		var that = this;
		this._datepicker = this.$('.input-daterange').datepicker({
		    format: "mm/dd/yyyy",
		    startDate: "-infinity"
		}).on('changeDate', that.parseDate.bind(that));
		
		this.setDefaultDates();
	},
	
	setDefaultDates: function() {
		if (otherSearchFilters.startDate) {
			this.$('.start-date').datepicker('setDate', otherSearchFilters.startDate)
		}
		if (otherSearchFilters.endDate) {
			this.$('.end-date').datepicker('setDate', otherSearchFilters.endDate)
		}
	},
	
	parseDate: function(ev){
		var target = ev.target.name;
		if (target === "start") {
			this._startDate = ev.date;
		} else {
			this._endDate = ev.date;
		} 

		this.filterMeDates();
	},
	
	filterMeDates: function() {	
		if ((this._startDate && this._endDate) && (this._startDate <= this._endDate)) {
			ScareBnb.Collections.listings.filters.startDate = this._startDate;
			ScareBnb.Collections.listings.filters.endDate = this._endDate;
			ScareBnb.Collections.listings.updateFilters();
		}
	},
	
	render: function() {
		var content = this.template();
		this.$el.html(content);
		this.attachDatepickers();
		// this.attachSelectMenu();
		
		return this;
	}

});