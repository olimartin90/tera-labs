# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all

user1 = User.create!({
  first_name: 'Olivier',
  last_name: 'Martin',
  email: 'olivier@example.com',
  password: '1q2w3e'
})

user2 = User.create!({
  first_name: 'Phil',
  last_name: 'Bolduc',
  email: 'phil@example.com',
  password: '1q2w3e'
})

GroupSensor.destroy_all

group1 = user1.group_sensors.create!({
  name: '0512',
  latitude: 45.212059,
  longitude: -73.743148
})

group2 = user1.group_sensors.create!({
  name: '0513',
  latitude: 45.212301,
  longitude: -73.738771
})

group3 = user1.group_sensors.create!({
  name: '0514',
  latitude: 45.209618,
  longitude: -73.741979
})

SingleSensor.destroy_all


moisture = group1.single_sensors.create!({
  data_type: "Soil Moisture",
  set_min: 0.2,
  set_max: 0.8
})

aeration = group1.single_sensors.create!({
  data_type: "Aeration",
  set_min: 15,
  set_max: 23
})

temp = group1.single_sensors.create!({
  data_type: "Soil Temp",
  set_min: 44,
  set_max: 58
})

nitrate = group1.single_sensors.create!({
  data_type: "Nitrate",
  set_min: 74,
  set_max: 89
})

phosphorus = group1.single_sensors.create!({
  data_type: "Phosphorus",
  set_min: 74,
  set_max: 89
})

salinity = group1.single_sensors.create!({
  data_type: "Salinity",
  set_min: 0.4,
  set_max: 1
})

respiration = group1.single_sensors.create!({
  data_type: "Respiration",
  set_min: 0.02,
  set_max: 0.08
})

ph = group1.single_sensors.create!({
  data_type: "pH",
  set_min: 6,
  set_max: 7
})

potassium = group1.single_sensors.create!({
  data_type: "Potassium",
  set_min: 80,
  set_max: 90
})

Datapoint.destroy_all

dateSc = Time.now.to_i - 180000
dateMs = dateSc * 1000

50.times do
  dateMs += 3_600_000
  moisture.datapoints.create!({
    data_value: rand(0.1..0.2).round(1),
    date_epoch: dateMs
  })
  aeration.datapoints.create!({
    data_value: rand(16.2..22.6).round(1),
    date_epoch: dateMs
  })
  temp.datapoints.create!({
    data_value: rand(45..56),
    date_epoch: dateMs
  })
  nitrate.datapoints.create!({
    data_value: rand(75..92),
    date_epoch: dateMs
  })
  phosphorus.datapoints.create!({
    data_value: rand(74..88),
    date_epoch: dateMs
  })
  salinity.datapoints.create!({
    data_value: rand(0.4..0.9).round(1),
    date_epoch: dateMs
  })
  respiration.datapoints.create!({
    data_value: rand(0.02..0.07).round(2),
    date_epoch: dateMs
  })
  ph.datapoints.create!({
    data_value: rand(6.1..6.8).round(1),
    date_epoch: dateMs
  })
  potassium.datapoints.create!({
    data_value: rand(81..88),
    date_epoch: dateMs
  })
end