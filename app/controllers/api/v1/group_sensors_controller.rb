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
      params[:single_sensors].each do |sensor|
        group.single_sensors.create(
          data_type: sensor[:data_type],
          set_min: sensor[:set_min],
          set_max: sensor[:set_max]
        )
        puts "rails sensor: #{sensor[:data_type]}"
        group.single_sensors.last.datapoints.create(
          data_value: 0,
          date_epoch: Time.now.to_i
        )
      end
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