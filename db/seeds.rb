# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
PlanCourse.delete_all
CatalogCourse.delete_all
Course.delete_all
Plan.delete_all
Catalog.delete_all
User.delete_all





# make users
user1 = User.new
user1.login = "joe"
user1.email = "joe@cedarville.edu"
user1.password = "password"
user1.password_confirmation = "password"
user1.save!

user2 = User.new
user2.login = "pete"
user2.email = "pete@cedarville.edu"
user2.password = "password"
user2.password_confirmation = "password"
user2.save!

# make courses
course1 = Course.new
course1.name = "CS1220"
course1.save!

# make plans
plan1 = Plan.new
plan1.name = "Plan1"
plan1.user_id = user1.id
plan1.save!

plan2 = Plan.new
plan2.name = "Plan2"
plan2.user_id = user1.id
plan2.save!

# make course-plans
plancourse1 = PlanCourse.new
plancourse1.plan = plan1
plancourse1.course = course1
plancourse1.term = "Fall"
plancourse1.year = 2018
plancourse1.save!

#make catalogs
catalog1 = Catalog.new
catalog1.year = 2018
catalog1.save!

#make catalog-courses
catalogcourse1 = CatalogCourse.new
catalogcourse1.catalog = catalog1
catalogcourse1.course = course1
catalogcourse1.save!