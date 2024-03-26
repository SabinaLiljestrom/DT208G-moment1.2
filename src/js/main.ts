// Interface för användare
interface CourseInfo {
    code: string;
    name: string;
    progression: any;
    syllabus: string;
  }

    // Funktion för att skriva ut kursdetaljer
    function printCourseDetails(course: CourseInfo): void {
        const courseDetailsDiv = document.getElementById("courseDetails");
        if (courseDetailsDiv) {
          const newCourseDiv = document.createElement("div");
          newCourseDiv.innerHTML = `
            <h2>Kursinformation:</h2>
            <p><strong>Kurskod:</strong> ${course.code}</p>
            <p><strong>Namn:</strong> ${course.name}</p>
            <p><strong>Progression:</strong> ${course.progression}</p>
            <p><strong>Länk kursplan:</strong> ${course.syllabus}</p>
          `;
          courseDetailsDiv.appendChild(newCourseDiv);
        }
}
// Hämta DOM-element för formulär och kursdetaljer
const courseForm = document.getElementById("courseForm") as HTMLFormElement;
let courseCodes: string[] = [];
// Lägg till händelselyssnare på formuläret
courseForm.addEventListener("submit", (event) => {
event.preventDefault();

// Hämta värden som skrivs in i formuläret
const codeInput = document.getElementById("code") as HTMLInputElement;
const nameInput = document.getElementById("name") as HTMLInputElement;
const progressionInput = document.getElementById("progression") as HTMLInputElement;
const syllabusInput = document.getElementById("syllabus") as HTMLInputElement;

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
 const newCourse: CourseInfo = {
    code: codeInput.value,
    name: nameInput.value,
    progression: progressionInput.value,
    syllabus: syllabusInput.value,
};

printCourseDetails(newCourse);
});
