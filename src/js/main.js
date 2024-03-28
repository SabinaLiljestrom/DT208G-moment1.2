var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Funktion för att skriva ut kursdetaljer 
function printCourseDetails(course) {
    var courseDetailsDiv = document.getElementById("courseDetails");
    if (courseDetailsDiv) {
        var newCourseDiv = document.createElement("div");
        newCourseDiv.innerHTML = "\n    <h2>Kursinformation:</h2>\n    <p><strong>Kurskod:</strong> <span id=\"codeSpan\" contenteditable=\"true\" data-key=\"code\">".concat(course.code, "</span></p>\n    <p><strong>Namn:</strong> <span id=\"nameSpan\" contenteditable=\"true\" data-key=\"name\">").concat(course.name, "</span></p>\n    <p><strong>Progression:</strong> <span id=\"progressionSpan\" contenteditable=\"true\" data-key=\"progression\">").concat(course.progression, "</span></p>\n    <p><strong>L\u00E4nk kursplan:</strong> <span id=\"syllabusSpan\" contenteditable=\"true\" data-key=\"syllabus\">").concat(course.syllabus, "</span></p>\n    ");
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
    // Inputvalidering 
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
    var newCourse = {
        code: codeInput.value,
        name: nameInput.value,
        progression: progressionInput.value,
        syllabus: syllabusInput.value,
    };
    courses.push(newCourse);
    localStorage.setItem("courses", JSON.stringify(courses));
    printCourseDetails(newCourse);
});
// Händelsehanterar när man ändrar info i en kurs så ändras det bara i just den kursen och updaterar local storage
document.body.addEventListener("input", function (event) {
    var _a, _b;
    var target = event.target;
    if (target && target.getAttribute("contenteditable") === "true") {
        var key_1 = target.getAttribute("data-key");
        var value_1 = target.textContent || "";
        var courseCode_1 = (_b = (_a = target.closest("div")) === null || _a === void 0 ? void 0 : _a.querySelector("#codeSpan")) === null || _b === void 0 ? void 0 : _b.textContent;
        if (courseCode_1) {
            courses = courses.map(function (course) {
                var _a;
                if (course.code === courseCode_1) {
                    return __assign(__assign({}, course), (_a = {}, _a[key_1] = value_1, _a));
                }
                return course;
            });
            localStorage.setItem("courses", JSON.stringify(courses));
        }
    }
});
