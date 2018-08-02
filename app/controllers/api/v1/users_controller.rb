module Api::V1

  class UsersController < ApplicationController

    # def new
    # end

    # def create
    #   user = User.new(user_params)
    #   if user.save
    #     session[:user_id] = user.id
    #     redirect_to '/'
    #   else
    #     redirect_to '/signup'
    #   end
    # end

    # private

    # def user_params
    #   params.require(:user).permit(:first_name, :first_name, :email, :password, :password_confirmation)
    # end

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
        :password_confirmation
      )
    end

  end

end