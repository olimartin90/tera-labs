# Tera Labs

## About the project

Tera Labs is a collaborative project which simulates a farming management web application using sensors to precisely measure important soil elements variations to help farmers make better decision by targeting problematic areas on the field.

### How it works

The pins on the map represent each unit placed in different areas on the field while the buttons on the left represents the 9 sensors inside each unit. Clicking on a unit brings the corresponding sensors on the left and clicking on a sensor brings a line chart for details on that specific sensor. Green means data collected is in range while red suggests further investigation in that area.

### Technically speaking

Rails act as an API and all routes are managed from front-end in React. Live data is created every 5 secs. and saved in a database.

### Project collaborators (alphebetical order)
- Philippe Bolduc
- Sylvain Goedike
- Thierry Gribeauval
- Olivier Martin

## Dependencies

* Ruby 2.3.5
* Rails 5.2
* React 16.4
* PostgreSQL
* bcrypt
* Axios
* CanvasJS API
* Google Maps API
* Wheather app API
* JSON Web Token
* Font Awesome
* Bootstrap

## Getting Started

1. Fork & Clone
2. Run `bundle install` to install server dependencies
3. Run `rake db:reset` to create, load and seed db in PostgreSQL
4. Run `npm install` to install client dependencies
5. Run `rails s -p 3001 -b 0.0.0.0` to start the server
6. Run `npm start` to start client
7. website at `http://localhost:3000/`

## Screenshots

#### Home page
!["home.png"](https://github.com/olimartin90/tera-labs/blob/master/docs/home.png)

#### Dashboard
!["dashboard.png"](https://github.com/olimartin90/tera-labs/blob/master/docs/dashboard.png)

#### Details of a sensor
!["details.png"](https://github.com/olimartin90/tera-labs/blob/master/docs/details.png)

#### Zooming-in for more precision
!["details-zoom.png"](https://github.com/olimartin90/tera-labs/blob/master/docs/details-zoom.png)

#### Adding a unit on the field
!["unit.png"](https://github.com/olimartin90/tera-labs/blob/master/docs/unit.png)