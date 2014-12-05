Rails.application.routes.draw do

  root to: 'static_pages#root'
  
  resources :users
  resource :session
  
  namespace :api, defaults: {format: :json} do
    resources :listings do 
    end

    resources :reservations, only: [:create, :index, :update, :show]
  end

end
