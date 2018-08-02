class AddUsersRefToGroups < ActiveRecord::Migration[5.2]
  def change
    add_reference :group_sensors, :user, foreign_key:true
  end
end
