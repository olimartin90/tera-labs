# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_07_31_192935) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "group_sensors", force: :cascade do |t|
    t.string "name"
    t.decimal "latitude"
    t.decimal "longitude"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_group_sensors_on_user_id"
  end

  create_table "single_sensors", force: :cascade do |t|
    t.string "data_type"
    t.float "data_value"
    t.float "set_min"
    t.float "set_max"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "group_sensor_id"
    t.index ["group_sensor_id"], name: "index_single_sensors_on_group_sensor_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password_digest"
    t.string "company"
    t.string "avatar"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "group_sensors", "users"
  add_foreign_key "single_sensors", "group_sensors"
end
