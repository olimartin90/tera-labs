module Api::V1


  class GroupSensorsDataController < ApplicationController

    def show

        user = User.find(params[:id])
        group_sensors = user.group_sensors

        group_sensors = group_sensors.map do | group_sensor |


          sensors = group_sensor.single_sensors.map do |sensor|
            {
              id: sensor.id,
              data_type: sensor.data_type,
              set_min: sensor.set_min,
              set_max: sensor.set_max,
              data_points: sensor.datapoints.to_a
            }
          end

          {
            id: group_sensor.id,
            name: group_sensor.name,
            longitude: group_sensor.longitude,
            latitude: group_sensor.latitude,
            single_sensors: sensors
          }

        end

        data = {
          user_id: user.id,
          group_sensors: group_sensors
        }

        render json: data

      end
    end
end
