# json.extract! plan, :id, :name, :created_at, :updated_at
# json.url plan_url(plan, format: :json)

json.plan do
    json.id @plan.id
    json.courses @plan.plan_courses do |planCourse|
        json.name planCourse.course.name
        json.year planCourse.year
        json.term planCourse.term
    end
end

json.catalog do
    json.catyear @catalog.year
end