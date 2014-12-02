ScareBnb.Collections.Listings = Backbone.Collection.extend({
	url: "/api/listings",
	
	model: ScareBnb.Models.Listing,
	
	filtered: function () {
		if (!this._filtered) {
			this._filtered = new ScareBnb.Collections.Listings();
			this._filtered.set(this.models);
		}
		return this._filtered;
	},
	
	// collection.filtered();
	
	filters: {
	},
	
	updateFilterByDate: function(models) {
		var startDate = new Date(this.filters.startDate);
		var endDate = new Date(this.filters.endDate);
		var that = this
		var models = models.filter(function(model) {
			var reservations = model.get("reservations")
			var conflict = false
			
			reservations.forEach(function(reservation){
				var reservationStartDate = new Date(reservation.start_date);
				var reservationEndDate = new Date(reservation.end_date);
				debugger;
				if (startDate > reservationStartDate && startDate < reservationEndDate) {
					conflict = true;
				} else if (endDate > reservationStartDate && endDate < reservationEndDate){
					conflict = true;
				} else if (startDate < reservationStartDate && endDate > reservationEndDate) {
					conflict = true;
				}
			});
			debugger;
			return (conflict === true ? false : true);
		});
		
		return models;
	},
	
	updateFilters: function () {
		if (typeof this.filters.lngx != "undefined") {
		that = this;
		
			//filtered by map
			var models = this.filter(function (model) {this
				var lat = model.get('latitude');
				var lng = model.get('longitude'); 
				if ((lng < that.filters.lngy && lng > that.filters.lngx) && (lat < that.filters.latx && lat > that.filters.laty)) {
					return true;
				} else
				return false;
			});

			//filtered by price
			if (typeof this.filters.upperRange != "undefined") {
				var models = models.filter(function(model) {
					var price = parseInt(model.get('price'))
						if (price >= that.filters.lowerRange && price <= that.filters.upperRange) {
							return true;
						} else {
							return false;
						}
				});
			}
			
			if (typeof this.filters.roomTypes != "undefined" && this.filters.roomTypes.length > 0) {
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
			}
			
			if (this.filters.startDate && this.filters.endDate) {
				var models = this.updateFilterByDate(models)
			}
			//narrows collection
			return this.filtered().set(models);
			
		}
	}
});

ScareBnb.Collections.listings = new ScareBnb.Collections.Listings()