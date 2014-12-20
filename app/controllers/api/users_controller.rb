module Api
  class UsersController < ApiController
    def show
      @user = User.find(params[:id])
      render :show
    end
  
    def new
    end

    def create
      @user = User.new(user_params)
      if @user.save
        sign_in!(@user)
        render json: { success: @user.id }
      else
        render json: @user.errors.full_messages
      end
    end
  
    protected
  
    def user_params
      params.require(:user).permit(:email, :password, :name)
    end
  end
end