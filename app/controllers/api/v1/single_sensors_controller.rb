module Api::V1

  class SingleSensorsController < ApplicationController

    def index
      render json: SingleSensor.all
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
      sensor = SingleSensor.find(params[:id])
      render json: sensor
    end

    def destroy
      SingleSensor.destroy(params[:id])
    end

    private

    def sensor_params
      params.require(:single_sensor).permit(
        :data_type,
        :data_value,
        :set_min,
        :set_max
      )
    end
  end

end
