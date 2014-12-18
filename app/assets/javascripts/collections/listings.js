ScareBnb.Collections.Listings = Backbone.Collection.extend({
	url: "/api/listings",
	
	model: ScareBnb.Models.Listing,

	images: function() {
    	if(!this._images) {
      		this._images = new ScareBnb.Collections.Images({ listing: this });
    	}

    	return this._images;
	},

	parse: function(response) { 
		if (response.images) {
			this.images().set(response.images, { parse: true });
		}
	
		return response;
	},
	
	filtered: function () {
		if (!this._filtered) {
			this._filtered = new ScareBnb.Collections.Listings();
			this._filtered.set(this.models);
		}
		return this._filtered;
	},
	
	filters: {
	},
	
	updateFilterByMap: function() {
		var that = this;
		var models = this.filter(function (model) {
			var lat = model.get('latitude');
			var lng = model.get('longitude');
			if ((lng < that.filters.lngy && lng > that.filters.lngx) && (lat < that.filters.latx && lat > that.filters.laty)) {
				return true;
			} else
			return false;
		});

		return models;
	},
	
	updateFilterByPrice: function(models) {
		var that = this;
		var models = models.filter(function(model) {
			var price = parseInt(model.get('price'))
				if (price >= that.filters.lowerRange && price <= that.filters.upperRange) {
					return true;
				} else {
					return false;
				}
		});

		return models;
	},
	
	updateFilterByRoomType: function(models) {
		var that = this;
		var models = models.filter(function(model) {
			var roomType = model.get('room_type')
			var includedType = false 
			
			for (var i = 0; i < that.filters.roomTypes.length; i++) {
				if (roomType === that.filters.roomTypes[i]) {
					includedType = true
				}
			}
			
			if (includedType) {
				return true
			} else {
				return false
			}	
				
		});
		
		return models;
	},
	
	
	//if (models) serves a solution to problem where filter was attempted before fetch
	updateFilterByDate: function(models) {
		var startDate = new Date(this.filters.startDate);
		var endDate = new Date(this.filters.endDate);
		var that = this
			if (models) {
				var models = models.filter(function(model) {
					var reservations = model.get("reservations")
					var conflict = false
			
					reservations.forEach(function(reservation){
						var reservationStartDate = new Date(reservation.start_date);
						var reservationEndDate = new Date(reservation.end_date);
						if (startDate > reservationStartDate && startDate < reservationEndDate) {
							conflict = true;
						} else if (endDate > reservationStartDate && endDate < reservationEndDate){
							conflict = true;
						} else if (startDate < reservationStartDate && endDate > reservationEndDate) {
							conflict = true;
						}
					});

					return (conflict === true ? false : true);
				});
			}
		
		return models;
	},
	
	updateFilterByMaxGuests: function(models) {
		var that = this;
		var models = models.filter(function(model){
			if (model.get('max_guests') >= that.filters.maxGuests){
				return true;
			} else {
				return false; 
			}
		});
		
		return models; 
	},
	
	updateFilters: function () {
		var that = this;
		
		if (typeof this.filters.lngx != "undefined") {
			var models = this.updateFilterByMap()
		}

		if (typeof this.filters.upperRange != "undefined") {
			var models = this.updateFilterByPrice(models)
		}
		
		if (typeof this.filters.roomTypes !== "undefined" && this.filters.roomTypes.length > 0) {
			var models = this.updateFilterByRoomType(models)
		}

		if (this.filters.startDate && this.filters.endDate) {
			var models = this.updateFilterByDate(models)
		}
			
		if (this.filters.maxGuests) {
			var models = this.updateFilterByMaxGuests(models);
		}
			
		return this.filtered().set(models);
	},
	
	getOrFetch: function(id) {
		
		var model = this.get(id);
		
			if (typeof model !== "undefined") {
				model.fetch();
			} else {
				var model = new ScareBnb.Models.Listing({id: id});
				model.fetch({
					success: function(){
						this.add(model)
					}.bind(this)
				});
			}
			return model;
	}
});

ScareBnb.Collections.listings = new ScareBnb.Collections.Listings()