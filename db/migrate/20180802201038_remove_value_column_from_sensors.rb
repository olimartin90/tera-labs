class RemoveValueColumnFromSensors < ActiveRecord::Migration[5.2]
  def change
    remove_column :single_sensors, :data_value
  end
end
