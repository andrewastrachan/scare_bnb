module Api
  class ReservationsController < ApiController
    def index

      @reservations = current_user.reservations.where(status: "PENDING")
      render :index
    end

    def show
      @reservation = Reservation.find(params[:id])
      render json: @reservation 
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

    def update 
      debugger
      @reservation = Reservation.find(params[:id])

      if @reservation.update(status: params[:status])
        render json: @reservation
      else
        render json: @reservation.errors.full_messages
      end
    end

    protected 

    def reservation_params
      params.require(:reservation).permit(:start_date, :end_date, :listing_id)
    end

    def reservation_status_update_params
      params.require(:reservation).permit(:status)
    end
  end
end