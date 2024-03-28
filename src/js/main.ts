// Interface för användare 
interface CourseInfo { 
  code: string; 
  name: string; 
  progression: any; 
  syllabus: string; }
// Funktion för att skriva ut kursdetaljer 
function printCourseDetails(course: CourseInfo): void {
  const courseDetailsDiv = document.getElementById("courseDetails");
  if (courseDetailsDiv) {
    const newCourseDiv = document.createElement("div");
    newCourseDiv.innerHTML = `
    <h2>Kursinformation:</h2>
    <p><strong>Kurskod:</strong> <span id="codeSpan" contenteditable="true" data-key="code">${course.code}</span></p>
    <p><strong>Namn:</strong> <span id="nameSpan" contenteditable="true" data-key="name">${course.name}</span></p>
    <p><strong>Progression:</strong> <span id="progressionSpan" contenteditable="true" data-key="progression">${course.progression}</span></p>
    <p><strong>Länk kursplan:</strong> <span id="syllabusSpan" contenteditable="true" data-key="syllabus">${course.syllabus}</span></p>
    `;
    courseDetailsDiv.appendChild(newCourseDiv); 
  }
}  
// Hämta DOM-element för formulär och kursdetaljer 
const courseForm = document.getElementById("courseForm") as HTMLFormElement;
let courses: CourseInfo[] = JSON.parse(localStorage.getItem("courses") || "[]");
// Skriv ut kursdetaljer för varje sparad kurs i localStorage när sidan laddas om 
courses.forEach(course => { printCourseDetails(course); });
// Lägg till händelselyssnare på formuläret 
courseForm.addEventListener("submit", (event) => { 
event.preventDefault();
// Hämta värden som skrivs in i formuläret 
const codeInput = document.getElementById("code") as HTMLInputElement; 
const nameInput = document.getElementById("name") as HTMLInputElement; 
const progressionInput = document.getElementById("progression") as HTMLInputElement; 
const syllabusInput = document.getElementById("syllabus") as HTMLInputElement;
// Inputvalidering 
if (progressionInput.value.length < 1 || progressionInput.value.length > 2) { 
  alert("Progression måste vara mellan 1 och 2 tecken långt"); 
  return; 
}
// Kontrollera om kurskoden redan finns i den sparade arrayen 
if (courses.some(course => course.code === codeInput.value)) { 
  alert("Kurskoden måste vara unik!"); 
  return; 
}
// Skapa ett kursobjekt och spara det i localStorage och i den lokala arrayen 
const newCourse: CourseInfo = { 
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
document.body.addEventListener("input", (event) => {
  const target = event.target as HTMLElement;
  if (target && target.getAttribute("contenteditable") === "true") {
    const key = target.getAttribute("data-key");
    const value = target.textContent || "";
    const courseCode = target.closest("div")?.querySelector("#codeSpan")?.textContent;
    if (courseCode) {
      courses = courses.map(course => {
        if (course.code === courseCode) {
          return { ...course, [key]: value };
        }
        return course;
      });
      localStorage.setItem("courses", JSON.stringify(courses));
    }
  }
});