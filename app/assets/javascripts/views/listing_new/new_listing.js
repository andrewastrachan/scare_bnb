ScareBnb.Views.newListing = Backbone.CompositeView.extend({
	template: JST["listing/new_listing"],
	
	initialize: function() {
	},

	events: {
		"submit form.form-listing" : "submitListing"
	},

	submitListing: function(event) {
		event.preventDefault();
		
		var formDetails = $(event.currentTarget).serializeJSON();
		var listingDetails = formDetails.listing;
		var imageDetails = formDetails.image;
		var newListing = new ScareBnb.Models.Listing(formDetails);
		var that = this;
		newListing.save(null, {
			success: function(model, response) {
				if (response.errors) {
					response.errors.forEach(function(error) {
						toastr.error(error);
					});
				} else {
					that.saveImage(response, formDetails);
				}

			}
		});
	},
	
	saveImage: function(listingId, formDetails) {
		debugger;
		var image = new ScareBnb.Models.Image(formDetails);
		image.attributes.image.listing_id = listingId;
		image.save(null, {
			success: function(model, response) {
				Backbone.history.navigate("listings/" + listingId, {trigger: true});
			},
			error: function() {
				toastr.error("something went wrong")
			}
		})
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
		
		//also add address box autocomplete
		
		var inputTwo = this.$('#listingAddress');
	  var addressBox = new google.maps.places.Autocomplete(inputTwo[0]);
	},
	
	render: function() {
		var content = this.template();
		this.$el.html(content);
		
		this.addNavbar();
		this.attachSearchBox();
		
		return this;
	}
}); 