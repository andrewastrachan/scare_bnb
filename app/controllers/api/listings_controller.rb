module Api
  class ListingsController < ApiController
    def index
      @listings = Listing.all
      #original was render json: @listings
      render :index
    end
  end
end