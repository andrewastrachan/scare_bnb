module Api
  class ListingsController < ApiController
    def index
      @listings = Listing.all
      render json: @listings
    end
  end
end