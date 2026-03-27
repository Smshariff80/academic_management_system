// script.js

// Initialize data from localStorage or defaults
let students = JSON.parse(localStorage.getItem('students')) || [
    { id: '001', name: 'John Doe' },
    { id: '002', name: 'Jane Smith' }
];

let courses = JSON.parse(localStorage.getItem('courses')) || [
    { code: 'CS101', name: 'Introduction to Computer Science' },
    { code: 'MATH201', name: 'Calculus II' }
];

let grades = JSON.parse(localStorage.getItem('grades')) || [
    { studentId: '001', courseCode: 'CS101', grade: 'A' }
];

// Save data to localStorage
function saveData() {
    localStorage.setItem('students', JSON.stringify(students));
    localStorage.setItem('courses', JSON.stringify(courses));
    localStorage.setItem('grades', JSON.stringify(grades));
}

// Update dashboard stats
function updateDashboard() {
    if (document.getElementById('total-students')) {
        document.getElementById('total-students').textContent = students.length;
    }
    if (document.getElementById('total-courses')) {
        document.getElementById('total-courses').textContent = courses.length;
    }
}

// Populate student select
function populateStudentSelect() {
    const select = document.getElementById('student-select');
    if (select) {
        select.innerHTML = '<option value="">Select Student</option>';
        students.forEach(student => {
            const option = document.createElement('option');
            option.value = student.id;
            option.textContent = student.name;
            select.appendChild(option);
        });
    }
}

// Populate course select
function populateCourseSelect() {
    const select = document.getElementById('course-select');
    if (select) {
        select.innerHTML = '<option value="">Select Course</option>';
        courses.forEach(course => {
            const option = document.createElement('option');
            option.value = course.code;
            option.textContent = course.name;
            select.appendChild(option);
        });
    }
}

// Render students table
function renderStudentsTable() {
    const tbody = document.querySelector('#students-table tbody');
    if (tbody) {
        tbody.innerHTML = '';
        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td><button onclick="editStudent('${student.id}')">Edit</button> <button onclick="deleteStudent('${student.id}')">Delete</button></td>
            `;
            tbody.appendChild(row);
        });
    }
}

// Render courses table
function renderCoursesTable() {
    const tbody = document.querySelector('#courses-table tbody');
    if (tbody) {
        tbody.innerHTML = '';
        courses.forEach(course => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${course.code}</td>
                <td>${course.name}</td>
                <td><button onclick="editCourse('${course.code}')">Edit</button> <button onclick="deleteCourse('${course.code}')">Delete</button></td>
            `;
            tbody.appendChild(row);
        });
    }
}

// Render grades table
function renderGradesTable() {
    const tbody = document.querySelector('#grades-table tbody');
    if (tbody) {
        tbody.innerHTML = '';
        grades.forEach(grade => {
            const student = students.find(s => s.id === grade.studentId);
            const course = courses.find(c => c.code === grade.courseCode);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student ? student.name : 'Unknown'}</td>
                <td>${course ? course.name : 'Unknown'}</td>
                <td>${grade.grade}</td>
                <td><button onclick="editGrade('${grade.studentId}', '${grade.courseCode}')">Edit</button> <button onclick="deleteGrade('${grade.studentId}', '${grade.courseCode}')">Delete</button></td>
            `;
            tbody.appendChild(row);
        });
    }
}

// Add student
document.getElementById('add-student-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('student-name').value;
    const id = document.getElementById('student-id').value;
    students.push({ id, name });
    saveData();
    renderStudentsTable();
    populateStudentSelect();
    updateDashboard();
    this.reset();
});

// Add course
document.getElementById('add-course-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('course-name').value;
    const code = document.getElementById('course-code').value;
    courses.push({ code, name });
    saveData();
    renderCoursesTable();
    populateCourseSelect();
    updateDashboard();
    this.reset();
});

// Assign grade
document.getElementById('assign-grade-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const studentId = document.getElementById('student-select').value;
    const courseCode = document.getElementById('course-select').value;
    const gradeValue = document.getElementById('grade').value;
    grades.push({ studentId, courseCode, grade: gradeValue });
    saveData();
    renderGradesTable();
    this.reset();
});

// Placeholder functions for edit/delete
function editStudent(id) { alert('Edit student ' + id); }
function deleteStudent(id) {
    students = students.filter(s => s.id !== id);
    saveData();
    renderStudentsTable();
    populateStudentSelect();
    updateDashboard();
}
function editCourse(code) { alert('Edit course ' + code); }
function deleteCourse(code) {
    courses = courses.filter(c => c.code !== code);
    saveData();
    renderCoursesTable();
    populateCourseSelect();
    updateDashboard();
}
function editGrade(studentId, courseCode) { alert('Edit grade for ' + studentId + ' in ' + courseCode); }
function deleteGrade(studentId, courseCode) {
    grades = grades.filter(g => g.studentId !== studentId || g.courseCode !== courseCode);
    saveData();
    renderGradesTable();
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    updateDashboard();
    populateStudentSelect();
    populateCourseSelect();
    renderStudentsTable();
    renderCoursesTable();
    renderGradesTable();
});