Rails.application.routes.draw do

  root to: 'static_pages#root'
  
  resources :users
  resource :session
  
  namespace :api, defaults: {format: :json} do
    resources :users
    
    resources :listings 
    
    resources :images, only: [:create]

    resources :reservations, only: [:create, :index, :update, :show]

    resources :trips, only: [:index]
  end

end
