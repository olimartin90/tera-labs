class CreateDatapoints < ActiveRecord::Migration[5.2]
  def change
    create_table :datapoints do |t|
      t.float :data_value

      t.timestamps
    end
  end
end
