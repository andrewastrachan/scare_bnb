module Api
  class ImagesController < ApiController

    def create
      @image = Image.new(image_params)

      if @image.save
        render json: { success: @image}
      else
        render json: { errors:  @image.errors.full_messages }
      end
    end

    protected

    def image_params
      params.require(:image).permit(:url, :listing_id)
    end
  end
end