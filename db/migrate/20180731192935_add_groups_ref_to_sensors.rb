class AddGroupsRefToSensors < ActiveRecord::Migration[5.2]
  def change
    add_reference :single_sensors, :group_sensor, foreign_key:true
  end
end
