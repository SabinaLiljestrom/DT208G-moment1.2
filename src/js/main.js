// Funktion för att skriva ut kursdetaljer
function printCourseDetails(course) {
    var courseDetailsDiv = document.getElementById("courseDetails");
    if (courseDetailsDiv) {
        var newCourseDiv = document.createElement("div");
        newCourseDiv.innerHTML = "\n            <h2>Kursinformation:</h2>\n            <p><strong>Kurskod:</strong> ".concat(course.code, "</p>\n            <p><strong>Namn:</strong> ").concat(course.name, "</p>\n            <p><strong>Progression:</strong> ").concat(course.progression, "</p>\n            <p><strong>L\u00E4nk kursplan:</strong> ").concat(course.syllabus, "</p>\n          ");
        courseDetailsDiv.appendChild(newCourseDiv);
    }
}
// Hämta DOM-element för formulär och kursdetaljer
var courseForm = document.getElementById("courseForm");
var courseCodes = [];
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
    if (courseCodes.includes(codeInput.value)) {
        alert("Kurskoden måste vara unik!");
        return;
    }
    // Lägg till den nya kurskoden i arrayen
    courseCodes.push(codeInput.value);
    // Skapa ett kursobjekt och spara det i localStorage
    var newCourse = {
        code: codeInput.value,
        name: nameInput.value,
        progression: progressionInput.value,
        syllabus: syllabusInput.value,
    };
    printCourseDetails(newCourse);
});
