ScareBnb.Views.newListing = Backbone.CompositeView.extend({
	template: JST["listing/new_listing"],
	
	initialize: function() {
	},

	events: {
		// "submit form" : "submitForm"
	},

	submitForm: function(event) {
		//
		// event.preventDefault();
		// that = this;
		// 	if ((typeof this._startDate === "object") && (typeof this._endDate === "object")) {
		// 		var newReservation = new ScareBnb.Models.Reservation()
		// 		newReservation.set("start_date", this._startDate)
		// 		newReservation.set("end_date", this._endDate)
		// 		newReservation.set("listing_id", this.model.get("id"))
		//
		// 		newReservation.save({}, {
		//
		// 			success: function() {
		// 				$('.booking-button').addClass("button-success")
		// 				$('.booking-button').html("Request Sent")
		// 				$('.booking-button').attr('value', 'Request Sent');
		// 				$('.booking-button').attr('disabled','disabled');
		// 				toastr.clear()
		// 				toastr.success("Request Sent");
		// 			}
		// 		});
		//
		// 	} else if ((typeof this._startDate === "undefined") || (typeof this._endDate === "undefined")) {
		// 		this.handleRequestErrors()
		// 	}
	},
	
	handleRequestErrors: function(event) {
		// var errors = []
		// if (typeof this._startDate === "undefined") {errors.push(["Date Error", "Please Include Start Date"])}
		// if (typeof this._endDate === "undefined") {errors.push(["Date Error", "Please Include End Date"])}
		// errors.forEach(function(error){
		// 	toastr.error(error[1], error[0]);
		// })

	},
	
	addNavbar: function() {
		var navbarView = new ScareBnb.Views.Navbar();
		this.addSubview(".navbar-vw", navbarView);
	},
	
	attachSearchBox: function() {
		var input = this.$('#search-box');
	  var searchBox = new google.maps.places.Autocomplete(input[0]);
		var that = this;
		google.maps.event.addListener(searchBox, 'place_changed', function() {
			var bounds = this.getPlace().geometry.location;
			locationSearchFilter.lng = bounds.lng();
			locationSearchFilter.lat = bounds.lat();
			Backbone.history.navigate("search", {trigger: true})
		});
	},
	
	render: function() {
		var content = this.template();
		this.$el.html(content);
		
		this.addNavbar();
		this.attachSearchBox();
		
		return this;
	}
}); 