ScareBnb.Views.Reservations = Backbone.View.extend({
	template: JST['reservation/requests'],

	initialize: function() {
		this.listenTo(this.collection, "sync remove", this.render)
	}, 

	events: {
		"click button" : "deleteReservation"
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

	render: function() {
		var content = this.template({reservations: this.collection})
		this.$el.html(content)

		return this;
	}
});