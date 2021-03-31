class Course < ApplicationRecord
    has_many :plan_courses
    has_many :plans, through: :plan_courses # Aidan added this line and the above, not sure if it is right
end
