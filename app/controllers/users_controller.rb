class UsersController < ApplicationController
  
  def show
    @user = User.find(params[:id])
    render json: @user
  end
  
  def new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end
  
  protected
  
  def user_params
    params.require(:user).permit(:email, :password, :name)
  end
  
end
