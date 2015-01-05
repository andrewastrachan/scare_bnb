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
    
    def create
      @listing = Listing.new(listing_params)
      @listing.owner_id = current_user.id
      
      if @listing.save
        render json: @listing.id 
      else
        render json: { errors:  @listing.errors.full_messages }
      end
    end
    
    protected
    
    def listing_params
      params.require(:listing).permit(:title, :address, :summary, :description, :price, :max_guests, :room_type)
    end
  end
end