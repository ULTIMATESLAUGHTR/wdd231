const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

// Function to calculate and display credit information
function updateCreditsInfo(filteredCourses) {
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    const earnedCredits = filteredCourses
        .filter(course => course.completed)
        .reduce((sum, course) => sum + course.credits, 0);

    document.getElementById('total-credits').innerHTML = `
        <div>Credits Earned: ${earnedCredits}</div>
        <div>Total Credits: ${totalCredits}</div>
    `;
}

// Function to display courses based on filter
function displayCourses(filteredCourses, buttonId) {
    const courseList = document.getElementById('course-list');
    courseList.innerHTML = ''; // Clear current display

    // Update credit information
    updateCreditsInfo(filteredCourses);

    // Update active button state
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.id === buttonId);
    });

    filteredCourses.forEach(course => {
        const courseElement = document.createElement('div');
        courseElement.className = 'course-item';
        
        // Only show course name
        courseElement.innerHTML = `
            <span class="course-name">${course.subject} ${course.number}</span>
            ${course.completed ? '<span class="checkmark">✓</span>' : ''}
        `;
        
        // Add completed class for styling
        if (course.completed) {
            courseElement.classList.add('completed');
        }
        
        courseList.appendChild(courseElement);
    });
}

// Event listeners for filter buttons
document.getElementById('all-courses').addEventListener('click', (e) => {
    displayCourses(courses, e.target.id);
});

document.getElementById('wdd-courses').addEventListener('click', (e) => {
    const wddCourses = courses.filter(course => course.subject === 'WDD');
    displayCourses(wddCourses, e.target.id);
});

document.getElementById('cse-courses').addEventListener('click', (e) => {
    const cseCourses = courses.filter(course => course.subject === 'CSE');
    displayCourses(cseCourses, e.target.id);
});

// Initial display of all courses
displayCourses(courses);

const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar');

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');
});

function currentyear() {
    const currentYear = new Date().getFullYear();
    document.getElementById("currentyear").textContent = currentYear;
    return currentYear;
}

function lastModified() {
    const lastModified = new Date(document.lastModified);
    document.getElementById('lastModified').textContent = `${lastModified}`;
}

console.log('This file was last modified on: ${lastModified()}');

currentyear();
lastModified();