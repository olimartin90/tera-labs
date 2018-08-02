class SingleSensor < ApplicationRecord
  belongs_to :group_sensor
  has_many :datapoints
end
