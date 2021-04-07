# json.extract! plan, :id, :name, :created_at, :updated_at
# json.url plan_url(plan, format: :json)

json.plan do
    json.student @plan.student
    json.name @plan.name
    json.major @plan.major
    json.currYear @plan.currYear
    json.currTerm @plan.currTerm
    
    json.courses @plan.plan_courses do |planCourse|
        json.id planCourse.course.courseId
        json.name planCourse.course.name
        json.year planCourse.year
        json.term planCourse.term
    end
end

json.catalog do
    json.year @catalog.year
    json.courses @catalog.catalog_courses do |cc|
           json.id cc.course.courseId
           json.name cc.course.name
           json.description cc.course.description
           json.credits cc.course.credits
           json.category cc.course.category
    end
end

json.categories do
    json.core @catalog.catalog_courses do |cc|
       json.array!(@courses) 
    end
end