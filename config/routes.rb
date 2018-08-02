Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # get '/login' => 'sessions#new'
  # post '/login' => 'sessions#create'
  # get '/logout' => 'sessions#destroy'

  # get '/signup' => 'users#new'
  # post '/users' => 'users#create'

  # root to: 'users#index'
  # root to: 'site#home'

  post 'auth_user' => 'authentication#authenticate_user'

  get 'home' => 'home#index'

  # resources :users, only: [:new, :create, :show, :index] do
  #   resources :group_sensors, only: [:new, :create, :destroy] do
  #     resources :single_sensors, only: [:create, :edit, :update, :destroy]
  #     end
  # end

  namespace :api do
    namespace :v1 do
      resources :home, only: [:index]
      resources :authentication, only: [:create]
      resources :users, only: [:index, :new, :create, :show] do
        resources :group_sensors, only: [:index, :create, :show, :update, :destroy] do
          resources :single_sensors, only: [:index, :create, :show, :update, :destroy] do
            resources :datapoints, only: [:index, :create, :show, :destroy]
          end
        end
      end
    end
  end

end
