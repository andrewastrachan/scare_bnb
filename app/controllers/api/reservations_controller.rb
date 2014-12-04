module Api
  class ReservationsController < ApiController
    def index
      @reservations = Reservation.all
      render json: @reservations
    end

    def create 
      @reservation = Reservation.new(reservation_params)
      @reservation.requester_id = current_user.id
      if @reservation.save
        render json: @reservation
      else
        render json: @reservation.errors.full_messages
      end
    end

    protected 

    def reservation_params
      params.require(:reservation).permit(:start_date, :end_date, :listing_id)
    end
  end
end