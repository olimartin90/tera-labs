module Api::V1

  class DatapointsController < ApplicationController

    def index
      render json: Datapoint.where(single_sensor_id: params[:single_sensor_id])
    end

    def new
      data = Datapoint.new
      render json: data
    end

    def create
      data = Datapoint.create(data_params)
      render json: data
    end

    def show
      data = Datapoint.where(single_sensor_id: params[:single_sensor_id], id: params[:id])
      render json: data
    end

    def destroy
      Datapoint.destroy(params[:id])
    end

    private

    def data_params
      params.require(:datapoint).permit(
        :data_value,
        :date_epoch,
        :single_sensor_id
      )
    end
  end

end
