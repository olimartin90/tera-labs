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
  password_digest: '1qaz'
})

user2 = User.create!({
  first_name: 'Phil',
  last_name: 'Bolduc',
  email: 'phil@example.com',
  password_digest: '1234'
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

group2 = user1.group_sensors.create!({
  name: '0514',
  latitude: 45.209618,
  longitude: -73.741979
})

SingleSensor.destroy_all

50.times do
  group1.single_sensors.create!({
    data_type: "Soil Moisture",
    data_value: rand(0.1..0.7),
    set_min: 0.2,
    set_max: 0.8
  })
end

50.times do
  group1.single_sensors.create!({
    data_type: "Aeration",
    data_value: rand(16.2..22.6),
    set_min: 15,
    set_max: 23
  })
end

50.times do
  group1.single_sensors.create!({
    data_type: "Soil Temp",
    data_value: rand(45..56),
    set_min: 44,
    set_max: 58
  })
end

50.times do
  group1.single_sensors.create!({
    data_type: "Nitrate",
    data_value: rand(75..92),
    set_min: 74,
    set_max: 89
  })
end

50.times do
  group1.single_sensors.create!({
    data_type: "Phosphorus",
    data_value: rand(74..88),
    set_min: 74,
    set_max: 89
  })
end

50.times do
  group1.single_sensors.create!({
    data_type: "Salinity",
    data_value: rand(0.4..0.9),
    set_min: 0.4,
    set_max: 1
  })
end

50.times do
  group1.single_sensors.create!({
    data_type: "Respiration",
    data_value: rand(0.02..0.07),
    set_min: 0.02,
    set_max: 0.08
  })
end

50.times do
  group1.single_sensors.create!({
    data_type: "pH",
    data_value: rand(6.1..6.8),
    set_min: 6,
    set_max: 7
  })
end

50.times do
  group1.single_sensors.create!({
    data_type: "Potassium",
    data_value: rand(81..88),
    set_min: 80,
    set_max: 90
  })
end