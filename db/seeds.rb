# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
PlanCourse.delete_all
CatalogCourse.delete_all
Catalog.delete_all
Course.delete_all
Plan.delete_all

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
course1.name = "Intro to Programming"
course1.courseId = "CS-1210"
course1.description = "Feeble effort to teach programming"
course1.credits = 3
course1.save!
course2 = Course.new
course2.name = "OOD"
course2.courseId = "CS-1220"
course2.description = "OOD?"
course2.credits = 3
course2.save!
course3 = Course.new
course3.name = "Intro to Basket-weaving"
course3.courseId = "BSKT-1000"
course3.description = "no description necessary"
course3.credits = 3
course3.save!
course4 = Course.new
course4.name = "Calculus V"
course4.courseId = "MATH-1750"
course4.description = "This got old a while ago"
course4.credits = 5
course4.save!
course5 = Course.new
course5.name = "Java"
course5.courseId = "CS-2210"
course5.description = "A type of coffee"
course5.credits = 3
course5.save!
course6 = Course.new
course6.name = "Turtle Salvation Seminar"
course6.courseId = "TRTL-2000"
course6.description = "Take this if you are a good person"
course6.credits = 2
course6.save!
course7 = Course.new
course7.name = "Intro to Vampire History"
course7.courseId = "VMP-2000"
course7.description = "Way easier than ADVANCED Vampire History"
course7.credits = 1
course7.save!
course8 = Course.new
course8.name = "Yeet"
course8.courseId = "YEET-1000"
course8.description = "Yeet yeet YEET"
course8.credits = 2
course8.save!

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

plancourse2 = PlanCourse.new
plancourse2.plan = plan1
plancourse2.course = course2
plancourse2.term = "Spring"
plancourse2.year = 2018
plancourse2.save!

plancourse3 = PlanCourse.new
plancourse3.plan = plan1
plancourse3.course = course3
plancourse3.term = "Fall"
plancourse3.year = 2019
plancourse3.save!

plancourse4 = PlanCourse.new
plancourse4.plan = plan1
plancourse4.course = course4
plancourse4.term = "Spring"
plancourse4.year = 2019
plancourse4.save!

plancourse5 = PlanCourse.new
plancourse5.plan = plan1
plancourse5.course = course5
plancourse5.term = "Fall"
plancourse5.year = 2020
plancourse5.save!

plancourse6 = PlanCourse.new
plancourse6.plan = plan1
plancourse6.course = course6
plancourse6.term = "Spring"
plancourse6.year = 2020
plancourse6.save!

plancourse7 = PlanCourse.new
plancourse7.plan = plan1
plancourse7.course = course7
plancourse7.term = "Fall"
plancourse7.year = 2021
plancourse7.save!

plancourse8 = PlanCourse.new
plancourse8.plan = plan1
plancourse8.course = course8
plancourse8.term = "Spring"
plancourse8.year = 2021
plancourse8.save!

#make catalogs
catalog1 = Catalog.new
catalog1.year = 2018
catalog1.save!

#make catalog-courses
catalogcourse1 = CatalogCourse.new
catalogcourse1.catalog = catalog1
catalogcourse1.course = course1
catalogcourse1.category = "core"
catalogcourse1.save!

catalogcourse2 = CatalogCourse.new
catalogcourse2.catalog = catalog1
catalogcourse2.course = course2
catalogcourse2.category = "core"
catalogcourse2.save!

catalogcourse3 = CatalogCourse.new
catalogcourse3.catalog = catalog1
catalogcourse3.course = course3
catalogcourse3.category = "electives"
catalogcourse3.save!

catalogcourse4 = CatalogCourse.new
catalogcourse4.catalog = catalog1
catalogcourse4.course = course4
catalogcourse5.category = "cognates"
catalogcourse4.save!

catalogcourse5 = CatalogCourse.new
catalogcourse5.catalog = catalog1
catalogcourse5.course = course5
catalogcourse5.category = "core"
catalogcourse5.save!

catalogcourse6 = CatalogCourse.new
catalogcourse6.catalog = catalog1
catalogcourse6.course = course6
catalogcourse6.category = "electives"
catalogcourse6.save!

catalogcourse7 = CatalogCourse.new
catalogcourse7.catalog = catalog1
catalogcourse7.course = course7
catalogcourse7.category = "electives"
catalogcourse7.save!

catalogcourse8 = CatalogCourse.new
catalogcourse8.catalog = catalog1
catalogcourse8.course = course8
catalogcourse8.category = "cognates"
catalogcourse8.save!