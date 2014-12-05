ScareBnb.Models.Listing = Backbone.Model.extend({
	urlRoot: "/api/listings",
	
	owner: function() {
    	if(!this._owner) {
      		this._owner = new ScareBnb.Models.Owner({ listing: this });
    	}

    	return this._owner;
	},

	images: function() {
    	if(!this._images) {
      		this._images = new ScareBnb.Collections.Images([], { listing: this });
    	}

    	return this._images;
  	},

	parse: function(response) {
		if (response.listing) {
			this.set(response.listing);
			delete response.listing;
		}
		
  	if (response.owner) {
  		this.owner().set(response.owner, { parse: true });
  		delete response.owner;
  	}

  	if (response.images) {
  		this.images().set(response.images, { parse: true });
  		delete response.images;
  	}

    return response;
  }
});