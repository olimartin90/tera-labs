Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'

  # get '/signup' => 'users#new'
  # post '/users' => 'users#create'

  # root to: 'users#index'
  root to: 'site#home'

  # resources :users, only: [:new, :create, :show, :index] do
  #   resources :group_sensors, only: [:new, :create, :destroy] do
  #     resources :single_sensors, only: [:create, :edit, :update, :destroy]
  #     end
  # end

  namespace :api do
    namespace :v1 do
      resources :users, only: [:new, :create, :show, :index]
        # resources :group_sensors, only: [:new, :create, :destroy] do
        #   resources :single_sensors, only: [:create, :edit, :update, :destroy]
        # end
      
    end
  end

end