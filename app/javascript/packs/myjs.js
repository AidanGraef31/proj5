

$(function(){
    // $('#calendarField').datepicker({ dateFormat: 'yy-mm-dd' });
    // $.getJSON("http://localhost:3000/plans/1.json", function(data) {
    //     var planJSON = data.plan;
    //     $('#testDiv').html(planJSON.id);
    // });
    load();
$(function() {
    $("#accordion").accordion({
    heightStyle: "content"
    });
  });
  $(document).on("click", ".accordion-toggle", function () {
if ($(this).attr('class').indexOf('open') == -1)
$(this).toggleClass("open").next().slideToggle('fast');
//Hide the other panels
$(".accordion-toggle").not($(this)).removeClass("open");
$(".accordion-content").not($(this).next()).slideUp('fast');
});

    // $('#testDiv').html("hi mom");
    // $('#example').DataTable();
    function load() {
        $.getJSON("http://localhost:3000/plans/1.json", function(data) {
            var planJSON = data.plan;
            var catalogJSON = data.catalog;
            var plan = makePlan(planJSON, catalogJSON);
            createUR(plan);
            createAccordion(catalogJSON);
            createCatalog(catalogJSON);
            selectPlans();
            $('#testDiv').html(planJSON.id);
        });
        // $.getJSON("getDatabase.php", function(data) {
        //     var catalogJSON = data.catalog;
        //     var planJSON = data.plan;
        //     var plan = makePlan(planJSON, catalogJSON);
        //     createUR(plan);
        //     createAccordion(catalogJSON);
        //     createCatalog(catalogJSON);
        //     selectPlans();
        // });
        
    }
    function createUR(plan) {
        convertPlan(plan);
        buildMain(plan);
    }
    function makePlan(planJson, courseJSON) {
        var currPlan = new Plan(planJson.name, planJson.catYear, planJson.major, planJson.student, planJson.currYear, planJson.currTerm);
        var planCourseIds = Object.keys(planJson.courses);
        for (var i = 0; i < planCourseIds.length; ++i) {
            var planJsonCourse = planJson.courses[planCourseIds[i]];
            var courseJSONCourse = courseJSON.courses[planCourseIds[i]];
            currPlan.courses.push(new Course(planJsonCourse.id, courseJSONCourse.name, planJsonCourse.term, planJsonCourse.year, courseJSONCourse.credits));
        }
        return currPlan;
    }
    
    
    
    function convertPlan(plan) {
        for (var i = 0; i < plan.courses.length; i++) {
            course = plan.courses[i];
            if (!plan.isYearPresent(course.effectiveYear)) {
                var year = new Year(course.effectiveYear);
                year.fall = new Semester("Fall");
                year.spring = new Semester("Spring");
                year.summer = new Semester("Summer");
                (plan.years).push(year);
            }
            var yearIndex = 0;
            for (yearIndex; yearIndex < plan.years.length; yearIndex++) {
                var yearObject = plan.years[yearIndex];
                if (yearObject.year == course.effectiveYear) {
                    break;
                }
            }
            var year = plan.years[yearIndex];
            if (course.term == "Fall") {
                year.fall.course.push(course);
            }
            else if (course.term == "Spring") {
                year.spring.course.push(course);
            }
            else {
                year.summer.course.push(course);
            }
        }
    }
    function calcTotalHours(plan) {
        var total = 0;
        for (var i = 0; i < plan.years.length; i++) {
            var hours = 0;
            hours += plan.years[i].fall.calcHours();
            hours += plan.years[i].spring.calcHours();
            hours += plan.years[i].summer.calcHours();
            total += hours;
        }
        return total;
    }
    function createAccordion(catalogJSON) {
        //$.getJSON("getRequirements.php", function(data) {
            
        
            var core = []; //data.categories.Core.courses;
            var electives = []; //data.categories.Electives.courses;
            var cognates = []; //data.categories.Cognates.courses;

            for(var i=0; i<catalogJSON.courses.length; i++){
                if(catalogJSON.courses[i].category == "core") {
                    core.push(catalogJSON.courses[i].id);
                }
                if(catalogJSON.courses[i].category == "electives") {
                    electives.push(catalogJSON.courses[i].id);
                }
                if(catalogJSON.courses[i].category == "cognates") {
                    cognates.push(catalogJSON.courses[i].id);
                }
            }


            var html = "";
            for (var i = 0; i < core.length; ++i) {
                // var catalogCourse = catalogJSON.courses[core[i]];
                var catalogCourse = core[i];
                var index = catalogJSON.courses.findIndex(x => x.id === core[i]);
                if(catalogCourse == undefined){
    
                }
                else{
                    html += "<div class='innerAccordion'>";
                    html += "<span draggable=true ondragstart='drag(event)' id=";
                    html += `${core[i]} `;
                    html += ">";
                    html += `${core[i]} `;
                    html += catalogJSON.courses[index].name
                    html += "</span>";
                    html += "</div>";
                }
            }
            $("#coreTab").html(html);
            html = "";
            for (i = 0; i < electives.length; ++i) {
                // var catalogCourse = catalogJSON.courses[electives[i]];
                var catalogCourse = electives[i];
                var index = catalogJSON.courses.findIndex(x => x.id === electives[i]);
                if(catalogCourse == undefined){
                }
                else {
                    html += "<div class='innerAccordion'>";
                    html += "<span draggable=true ondragstart='drag(event)' id=";
                    html += `${electives[i]} `;
                    html += ">";
                    html += `${electives[i]} `;
                    html += catalogJSON.courses[index].name
                    html += "</span>";
                    html += "</div>";
                }
            }
            $("#electivesTab").html(html);
            html = "";
            for (i = 0; i < cognates.length; ++i) {
                // var catalogCourse = catalogJSON.courses[cognates[i]];
                var catalogCourse = cognates[i];
                var index = catalogJSON.courses.findIndex(x => x.id === cognates[i]);
                if(catalogCourse == undefined){
                }
                else {
                html += "<div class='innerAccordion'>";
                html += "<span draggable=true ondragstart='drag(event)' id=";
                html += `${cognates[i]} `;
                html += ">";
                html += `${cognates[i]} `;
                html += catalogJSON.courses[index].name
                html += "</span>";
                html += "</div>";
                }
            }
            $("#cognatesTab").html(html);
        //});
    }
    
    function createCatalog(catalogJson) {
        $(document).ready( function () {
            var catalogCourses = catalogJson.courses;
            var courseIds = Object.keys(catalogCourses);
            var html = "";
            for (var i = 0; i < courseIds.length; ++i) {
                var course = catalogCourses[courseIds[i]];
                html += "<tr role='row' class='odd'>";
                html += `<td>${course.id}</td>`;
                html += `<td>${course.name}</td>`;
                html += `<td>${course.credits}</td>`;
                html += `<td>${course.description}</td>`
                html += "</tr>";
            }
            $("#tableBody").html(html);
                $('#catalogTable').DataTable( {
                paging: false,
                info: false,
                destroy: true,
                "scrollY": true,
                "scrollY": "200px",
                "scrollCollapse": true,
                "paging": false,
                "scrollX": false
            });
        });
    }
    function buildMain(plan) {
        var UR = document.getElementById("UR");
        var html = createHtml(plan);
        UR.innerHTML = html;
        var totalHours = 0;
        totalHours = calcTotalHours(plan);
        if(plan.major == 1){
            var planMajor = "Comp. Sci";
        }else{
            var planMajor = "Undeclared";
        }
        if(plan.student == 1){
            var planStudent = "Joe";
        }else{
            var planStudent = "Jarett";
        }
        document.getElementById("header").innerHTML = ` <span id= 'Acro'>CAPE: Welcome, ${planStudent}</span> <span id= 'Title'>Cedarville Academic Planning Environment</span>  <span id = 'TotalHours'>Total Hours: ${totalHours} <br> Major: ${planMajor} <br> Catalog: ${plan.years[0].year -1 }</span> `
    }
    
    function createHtml(plan) {
        var html = "";
        for (var i = 0; i < plan.years.length; i++) {
            var year = plan.years[i];
            html += "<div class='year'>";
            html += buildSemesterCourses(plan, year.fall, year);
            html += buildSemesterCourses(plan, year.spring, year);
            html += buildSemesterCourses(plan, year.summer, year);
            html += "</div>";
        }
        return html;
    }
    
    function buildSemesterCourses(plan, semester, year) {
        var html = "";
        if (year.year < plan.currYear) {
            html += '<div class="sem" ondrop="drop(event)" ondragover="allowDrop(event)">';
        }
        else {
            html += '<div class="sem" ondrop="drop(event)" ondragover="allowDrop(event)">';
        }
        var hours = semester.calcHours();
        if(semester.term == "Fall"){
            html += `<div class='semesterYear'>${semester.term} ${year.year - 1} | Hours: ${hours}</div>`;
        }else{
      html += `<div class='semesterYear'>${semester.term} ${year.year} | Hours: ${hours}</div>`;
        }
        html += "<div class='semesterClasses'>";
        for (var i = 0; i < semester.course.length; i++) {
            var course = semester.course[i];
            html += `<span class='class' id=${course.courseId} draggable=true ondragstart="drag(event)">${course.courseId} ${course.name} <br></span>`;
        }
        html += "</div></div>";
    
        return html;
    }
    
    class Plan {
        constructor(name, catalogYear, major, student, currYear, currTerm) {
            this.name = name;
            this.catalogYear = catalogYear;
            this.major = major;
            this.student = student;
            this.currYear = currYear;
            this.currTerm = currTerm;
            this.courses = [];
            this.years = [];
        }
        addCourse(courseId, name, term, year, hours) {
            var course = new Course(courseId, name, term, year, hours);
            this.courses.push(course);
        }
        isYearPresent(year) {
            for (var i = 0; i < this.years.length; i++) {
                if (this.years[i].year == year) {
                    return true;
                }
            }
            return false;
        }
    
    }
    
    
    function selectPlans() {
        $.getJSON("getPlans.php", function(data) {
            var list = "";
            for(var i = 0; i<data.plans.length; i++){
                list += "<option value='" + data.plans[i].name + "'>" + data.plans[i].name + "</option>";
            }
            document.getElementById("plans").innerHTML = list;
            var planName = document.getElementById("plans").value;
            var realPlan;
            for(var i = 0; i<data.plans.length; i++){
                if(planName == data.plans[i].name){
                    realPlan = data.plans[i];
                }
            }
            var plan = makePlan(realPlan, data.catalog);
            createUR(plan);
        });
    }
    
    function ChoosePlans() {
        $.getJSON("getPlans.php", function(data) {
            var planName = document.getElementById("plans").value;
            var realPlan;
            for(var i = 0; i<data.plans.length; i++){
                if(planName == data.plans[i].name){
                    realPlan = data.plans[i];
                }
            }
            var plan = makePlan(realPlan, data.catalog);
            createUR(plan);
        });
    }
    
    class Course {
        constructor(courseId, name, term, year, hours) {
            this.courseId = courseId;
            this.name = name;
            this.term = term;
            this.year = year;
            if (term == "Spring" || term == "Summer") {
                this.effectiveYear = parseInt(year);
            }
            else {
                this.effectiveYear = parseInt(year);
            }
            this.hours = hours;
        }
    }
    
    class Year {
        constructor(year) {
            this.year = year;
            this.fall = {};
            this.spring = {};
            this.summer = {};
        }
    }
    
    class Semester {
        constructor(term) {
            this.term = term;
            this.course = [];
        }
        
        calcHours() {
            if (this.course.length == 0) {
                return 0;
            }
            else {
                var hours = 0;
                for (var i = 0; i < this.course.length; i++) {
                    hours += parseInt(this.course[i].hours);
                }
                return hours;
            }
        }
    }


  




});