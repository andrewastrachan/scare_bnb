ScareBnb.Models.Reservation = Backbone.Model.extend({
	urlRoot: "api/reservations",
 
	requester: function() {
    	if(!this._requester) {
      		this._requester = new ScareBnb.Models.Requester({ reservation: this });
    	}

    	return this._requester;
	},
 
	parse: function(response) { 
		if (response.requester) {

			this.requester().set(response.requester, { parse: true });
		}
	
		return response;
	},
});