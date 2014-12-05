ScareBnb.Models.Trip = Backbone.Model.extend({
	urlRoot: "api/reservation",
 
	owner: function() {
    	if(!this._owner) {
      		this._owner = new ScareBnb.Models.Owner({ reservation: this });
    	}
    	return this._owner;
	},
 
	parse: function(response) { 
		if (response.owner) {
			this.owner().set(response.owner, { parse: true });
		}
		return response;
	}
});