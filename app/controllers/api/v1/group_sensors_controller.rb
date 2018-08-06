module Api::V1

  class GroupSensorsController < ApplicationController

    def index
      render json: GroupSensor.where(user_id: params[:user_id])
    end

    def new
      group = GroupSensor.new
      render json: group
    end

    def create
      group = GroupSensor.create(group_params)
      render json: group
    end

    def show
      group = GroupSensor.where(user_id: params[:user_id], id: params[:id])
      render json: group
    end

    def destroy
      GroupSensor.destroy(params[:id])
    end

    private

    def group_params
      params.require(:group_sensor).permit(
        :name,
        :latitude,
        :longitude,
        :user_id,
        :single_sensors
      )
    end
  end

end