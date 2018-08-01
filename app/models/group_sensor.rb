class GroupSensor < ApplicationRecord
  belongs_to :user
  has_many :single_sensors
end

