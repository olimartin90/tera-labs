# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Datapoint.destroy_all
SingleSensor.destroy_all
GroupSensor.destroy_all
User.destroy_all

User.create({
  first_name: 'Georges',
  last_name: 'Champion',
  email: 'georges@lightfarm.com',
  password: '1q2w3e',
  phone: '5141234567',
  company_name: 'Light Farm Inc.',
  latitude: 45.212139,
  longitude: -73.739222
})

User.create({
  first_name: 'Phil',
  last_name: 'Bolduc',
  email: 'phil@example.com',
  password: '1q2w3e',
  phone: '4189329375',
  company_name: 'Ferme P. Bolduc & Fils',
  latitude: 46.7830,
  longitude: -71.2861
})

2.times do |u| u += 1
  GroupSensor.create({
    name: 'TL-0512',
    latitude: 45.216341,
    longitude: -73.737398,
    user_id: u
  })

  GroupSensor.create({
    name: 'TL-0513',
    latitude: 45.214165,
    longitude: -73.740960,
    user_id: u
  })

  GroupSensor.create({
    name: 'TL-0514',
    latitude: 45.211988,
    longitude: -73.744651,
    user_id: u
  })

  GroupSensor.create({
    name: 'TL-0515',
    latitude: 45.214104,
    longitude: -73.736411,
    user_id: u
  })

  GroupSensor.create({
    name: 'TL-0516',
    latitude: 45.212079,
    longitude: -73.740016,
    user_id: u
  })
end


5.times do |i| i += 1
  SingleSensor.create({
    data_type: "Soil Moisture",
    set_min: 0.2,
    set_max: 0.8,
    group_sensor_id: i
  })

  SingleSensor.create({
    data_type: "Aeration",
    set_min: 15,
    set_max: 23,
    group_sensor_id: i
  })

  SingleSensor.create({
    data_type: "Soil Temp",
    set_min: 44,
    set_max: 58,
    group_sensor_id: i
  })

  SingleSensor.create({
    data_type: "Nitrate",
    set_min: 74,
    set_max: 89,
    group_sensor_id: i
  })

  SingleSensor.create({
    data_type: "Phosphorus",
    set_min: 74,
    set_max: 89,
    group_sensor_id: i
  })

  SingleSensor.create({
    data_type: "Salinity",
    set_min: 0.4,
    set_max: 1,
    group_sensor_id: i
  })

  SingleSensor.create({
    data_type: "Respiration",
    set_min: 0.02,
    set_max: 0.08,
    group_sensor_id: i
  })

  SingleSensor.create({
    data_type: "pH",
    set_min: 6,
    set_max: 7,
    group_sensor_id: i
  })

  SingleSensor.create({
    data_type: "Potassium",
    set_min: 80,
    set_max: 90,
    group_sensor_id: i
  })
end

5.times do |x| x *= 9
  dateSc = Time.now.to_i + 180000
  dateMs = dateSc * 1000
  x += 1
  50.times do
    dateMs -= 3_600_000
    Datapoint.create({
      data_value: rand(0.3..0.6).round(1),
      date_epoch: dateMs,
      single_sensor_id: x
    })
  end
  dateMs = dateSc * 1000
  x += 1
  50.times do
    dateMs -= 3_600_000
    Datapoint.create({
      data_value: rand(16.2..22.6).round(1),
      date_epoch: dateMs,
      single_sensor_id: x
    })
  end
  dateMs = dateSc * 1000
  x += 1
  50.times do
    dateMs -= 3_600_000
    Datapoint.create({
      data_value: rand(45..56),
      date_epoch: dateMs,
      single_sensor_id: x
    })
  end
  dateMs = dateSc * 1000
  x += 1
  50.times do
    dateMs -= 3_600_000
    Datapoint.create({
      data_value: rand(75..92),
      date_epoch: dateMs,
      single_sensor_id: x
    })
  end
  dateMs = dateSc * 1000
  x += 1
  50.times do
    dateMs -= 3_600_000
    Datapoint.create({
      data_value: rand(74..88),
      date_epoch: dateMs,
      single_sensor_id: x
    })
  end
  dateMs = dateSc * 1000
  x += 1
  50.times do
    dateMs -= 3_600_000
    Datapoint.create({
      data_value: rand(0.4..0.9).round(1),
      date_epoch: dateMs,
      single_sensor_id: x
    })
  end
  dateMs = dateSc * 1000
  x += 1
  50.times do
    dateMs -= 3_600_000
    Datapoint.create({
      data_value: rand(0.02..0.07).round(2),
      date_epoch: dateMs,
      single_sensor_id: x
    })
  end
  dateMs = dateSc * 1000
  x += 1
  50.times do
    dateMs -= 3_600_000
    Datapoint.create({
      data_value: rand(6.1..6.8).round(1),
      date_epoch: dateMs,
      single_sensor_id: x
    })
  end
  dateMs = dateSc * 1000
  x += 1
  50.times do
    dateMs -= 3_600_000
    Datapoint.create({
      data_value: rand(81..88),
      date_epoch: dateMs,
      single_sensor_id: x
    })
  end
end

