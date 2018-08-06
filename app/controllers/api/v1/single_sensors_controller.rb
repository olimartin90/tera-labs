module Api::V1

  class SingleSensorsController < ApplicationController

    def index
      render json: SingleSensor.where(group_sensor_id: params[:group_sensor_id])
    end

    def new
      sensor = SingleSensor.new
      render json: sensor
    end

    def create
      sensor = SingleSensor.create(sensor_params)
      render json: sensor
    end

    def show
      sensor = SingleSensor.where(group_sensor_id: params[:group_sensor_id], id: params[:id])
      render json: sensor
    end

    def destroy
      SingleSensor.destroy(params[:id])
    end

    private

    def sensor_params
      params.require(:single_sensor).permit(
        :data_type,
        :set_min,
        :set_max,
        :group_sensor_id
      )
    end
  end

end
