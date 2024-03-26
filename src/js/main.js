// Funktion för att skriva ut kursdetaljer 
function printCourseDetails(course) {
    var courseDetailsDiv = document.getElementById("courseDetails");
    if (courseDetailsDiv) {
        var newCourseDiv = document.createElement("div");
        newCourseDiv.innerHTML = "<h2>Kursinformation:</h2> \n<p><strong>Kurskod:</strong> ".concat(course.code, "</p> \n<p><strong>Namn:</strong> ").concat(course.name, "</p> \n<p><strong>Progression:</strong> ").concat(course.progression, "</p> \n<p><strong>L\u00E4nk kursplan:</strong> ").concat(course.syllabus, "</p> ");
        courseDetailsDiv.appendChild(newCourseDiv);
    }
}
// Hämta DOM-element för formulär och kursdetaljer 
var courseForm = document.getElementById("courseForm");
var courses = JSON.parse(localStorage.getItem("courses") || "[]");
// Skriv ut kursdetaljer för varje sparad kurs i localStorage när sidan laddas om 
courses.forEach(function (course) { printCourseDetails(course); });
// Lägg till händelselyssnare på formuläret 
courseForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // Hämta värden som skrivs in i formuläret 
    var codeInput = document.getElementById("code");
    var nameInput = document.getElementById("name");
    var progressionInput = document.getElementById("progression");
    var syllabusInput = document.getElementById("syllabus");
    // Här ska inputvalidering läggas till 
    if (progressionInput.value.length < 1 || progressionInput.value.length > 2) {
        alert("Progression måste vara mellan 1 och 2 tecken långt");
        return;
    }
    // Kontrollera om kurskoden redan finns i den sparade arrayen 
    if (courses.some(function (course) { return course.code === codeInput.value; })) {
        alert("Kurskoden måste vara unik!");
        return;
    }
    // Skapa ett kursobjekt och spara det i localStorage och i den lokala arrayen 
    var newCourse = { code: codeInput.value, name: nameInput.value, progression: progressionInput.value, syllabus: syllabusInput.value, };
    courses.push(newCourse);
    localStorage.setItem("courses", JSON.stringify(courses));
    printCourseDetails(newCourse);
});
