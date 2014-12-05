module Api	
	class TripsController < ApplicationController
		def index
			@trips = current_user.sent_rental_requests
			render :index
		end
	end
end
