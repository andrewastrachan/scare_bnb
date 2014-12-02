module Api
  class ListingsController < ApiController
    def index
      @listings = Listing.all
      #original was render json: @listings
      render :index
    end
    
    def show
      @listing = Listing.find(params[:id])
      render :show
    end
  end
end