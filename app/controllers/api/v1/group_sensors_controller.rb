module Api::V1

  class GroupSensorsController < ApplicationController

    def index
      render json: GroupSensor.all
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
      group = GroupSensor.find(params[:id])
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
        :longitude
      )
    end
  end

end