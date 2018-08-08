module Api::V1

  class AuthenticationController < ApplicationController
    def create
      user = User.find_for_database_authentication(email: user_params[:email])
      puts user_params
      if user && user.valid_password?(user_params[:password])
        render json: payload(user)
      else
        render json: {errors: ['Invalid Username/Password']}, status: :unauthorized
      end
    end

    private

    def payload(user)
      return nil unless user and user.id
      {
        auth_token: JsonWebToken.encode({user_id: user.id}),
        user: {
          id: user.id, 
          email: user.email, 
          company_name: user.company_name,
          latitude: user.latitude,
          longitude: user.longitude
        }
      }
    end

    def user_params
      params.require(:user).permit(
        :first_name, 
        :last_name, 
        :email, 
        :password, 
        :password_confirmation
        )
    end

  end

end