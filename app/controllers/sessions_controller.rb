class SessionsController < ApplicationController
  
  def new
  end
  
  def create
    @user = User.find_by_credentials(params[:user])
    
    if @user
      sign_in!(@user)  
      # redirect_to user_url(@user)
      render json: { success: @user.id }
    else
      errors = []
      errors << "E-mail can't be blank" if params[:user][:email].empty?
      errors << "Password can't be blank" if params[:user][:password].empty?
      if params[:user][:email].present? && params[:user][:password].present?
        errors << "Invalid Credentials, please try again" 
      end
      render json: { errors: errors }
    end
  end
  
  def destroy
    sign_out!
    render json: current_user
  end 
  
end
