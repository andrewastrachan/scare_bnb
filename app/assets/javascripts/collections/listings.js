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
			//narrows collection
			return this.filtered().set(models);
			
		}
	}
});

ScareBnb.Collections.listings = new ScareBnb.Collections.Listings()