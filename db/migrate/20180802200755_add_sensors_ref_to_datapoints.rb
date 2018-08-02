class AddSensorsRefToDatapoints < ActiveRecord::Migration[5.2]
  def change
    add_reference :datapoints, :single_sensor, foreign_key:true
  end
end
