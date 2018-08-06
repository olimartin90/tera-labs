class AddDateColumnToDatapoints < ActiveRecord::Migration[5.2]
  def change
    add_column :datapoints, :date_epoch, :bigint
  end
end
