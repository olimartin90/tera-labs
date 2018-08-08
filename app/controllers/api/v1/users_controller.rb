module Api::V1

  class UsersController < ApplicationController

    def index
      render json: User.all
    end

    def new
      user = User.new
      render json: user
    end

    def create
      user = User.create(user_params)
      render json: user
    end

    def show
      user = User.find(params[:id])
      render json: user
    end

    def destroy
      User.destroy(params[:id])
    end

    def update
      user = User.find(params[:id])
      user.update_attributes(user_params)
      render json: user
    end

    private

    def user_params
      params.require(:user).permit(
        :first_name,
        :last_name,
        :email,
        :password,
        :password_confirmation,
        :phone,
        :company_name,
        :latitude,
        :longitude,
        :avatar
      )
    end

  end

end