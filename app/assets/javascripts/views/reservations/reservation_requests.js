ScareBnb.Views.Reservations = Backbone.CompositeView.extend({
	template: JST['reservation/requests'],

	initialize: function() {
		this.listenTo(this.collection, "sync remove", this.render)
	}, 

	events: {
		"click button" : "deleteReservation"
	},
	
	addNavbar: function() {
		var navbarView = new ScareBnb.Views.Navbar();
		this.addSubview(".navbar-vw", navbarView);
	},

	deleteReservation: function(event) {
		event.preventDefault();
		var reservationId = $(event.currentTarget).data("id")
		var updatedReservation = this.collection.get(reservationId);
		var newStatus = $(event.currentTarget).html()

		if (newStatus === "Accept") {
			updatedReservation.set("status", "APPROVED")
		} else {
			updatedReservation.set("status", "DECLINED")
		}

		updatedReservation.save({
			success: function(){
				console.log("whoot");
			}
		});

		this.collection.remove(updatedReservation);
	},
	
	attachSearchBox: function() {
		var input = this.$('#search-box');
	  var searchBox = new google.maps.places.Autocomplete(input[0]);
		var that = this;
		google.maps.event.addListener(searchBox, 'place_changed', function() {
			var bounds = this.getPlace().geometry.location;
			locationSearchFilter.lng = bounds.lng();
			locationSearchFilter.lat = bounds.lat();
			Backbone.history.navigate("", {trigger: true})
		});
	},

	render: function() {
		var content = this.template({reservations: this.collection})
		this.$el.html(content)
		this.addNavbar();
		this.attachSearchBox();
		return this;
	}
});