ScareBnb.Views.ListingShow = Backbone.CompositeView.extend({
	template: JST["show/listing_show"],
	
	initialize: function() {
		this.listenTo(this.model, "sync", this.render)
	},

	events: {
		"submit form" : "submitForm"
	},

	submitForm: function(event) {
		
		event.preventDefault();
		that = this;
			if ((typeof this._startDate === "object") && (typeof this._endDate === "object")) {
				var newReservation = new ScareBnb.Models.Reservation()
				newReservation.set("start_date", this._startDate)
				newReservation.set("end_date", this._endDate)
				newReservation.set("listing_id", this.model.get("id"))

				newReservation.save({}, {

					success: function() {
						$('.booking-button').addClass("button-success")
						$('.booking-button').html("Request Sent")
						$('.booking-button').attr('value', 'Request Sent');
						$('.booking-button').attr('disabled','disabled');
					}
				});

			} else if (typeof this._startDate !== "object") {
				$( ".booking-button" ).effect( "shake", {distance: 5}, 30 )
			}
	},
	
	attachCarousel: function() {
		var carouselView = new ScareBnb.Views.Carousel({collection: this.model.images()})
		this.addSubview(".carousel-container", carouselView)
	},

	attachCalendars: function() {
	   	this._startingCalendar = this.$( "#check-in" ).datepicker({
	      defaultDate: "+1w",
	      changeMonth: true,
	      numberOfMonths: 1,
	      onClose: function( selectedDate ) {
	        $( "#check-out" ).datepicker( "option", "minDate", selectedDate );
	      },
				onSelect: this.parseDate.bind(this)
	    	});
	    this._endingCalendar = this.$( "#check-out" ).datepicker({
	      defaultDate: "+1w",
	      changeMonth: true,
	      numberOfMonths: 1,
	      onClose: function( selectedDate ) {
	        $( "#check-in" ).datepicker( "option", "maxDate", selectedDate );
	      },
				onSelect: this.parseDate.bind(this)
			});
	},

	parseDate: function(dateInf, dateObj){
		if (dateObj.id === "check-in") {
			this._startDate = new Date(dateInf);
		} else {
			this._endDate = new Date(dateInf);
		}
	},
	
	render: function() {
		var content = this.template({listing: this.model});
		this.$el.html(content);
		if (this.model.images()) {
			this.attachCarousel();
		}

		if (this.model.images()) {
			this.attachCalendars();
		}

		
		
		return this;
	}
}); 