module Api::V1


  class GroupSensorsDataController < ApplicationController

   def show

      # id = params[:id]
      user = User.find(1)
      data = {id: user.id, group_sensors: []}
      group_sensors = user.group_sensors

      group_sensors.each do |group_sensor|
        group_sensor = {id: group_sensor.id, name: group_sensor.name, latitude: group_sensor.latitude, longitude: group_sensor.longitude, single_sensors: []}

        group_sensor.single_sensors.each do |single_sensor|
          single_sensor = {id: single_sensor.id, data_type: single_sensor.data_type, min: single_sensor.set_min, max: single_sensor.set_max, datapoints: []}

          single_sensor.datapoints. each do |data_point|
            datapoint = {id: datapoint.id, data_value: datapoint.data_value}
            single_sensor.datapoints.push(datapoint)

          end
          group_sensor.single_sensors.push(single_sensor)
        end
      data.group_sensors.push(group_sensor)

      end
    puts data.inspect
   end
  end
end
