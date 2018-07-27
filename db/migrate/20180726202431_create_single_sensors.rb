class CreateSingleSensors < ActiveRecord::Migration[5.2]
  def change
    create_table :single_sensors do |t|
      t.string :data_type
      t.float :data_value
      t.float :set_min
      t.float :set_max

      t.timestamps
    end
  end
end
