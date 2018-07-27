class CreateGroupSensors < ActiveRecord::Migration[5.2]
  def change
    create_table :group_sensors do |t|
      t.string :name
      t.decimal :latitude
      t.decimal :longitude

      t.timestamps
    end
  end
end
