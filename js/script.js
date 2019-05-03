/* GLOBAL VARIABLES
===================*/
const mainDiv = document.querySelector('.page');
const pageHeader = document.querySelector('.page-header');
const students = document.querySelectorAll('.student-item');
const page = document.getElementsByTagName('a');
const studentCount = document.querySelectorAll('.student-item').length;
const pageCount = Math.ceil(studentCount / 10);
const name = document.querySelectorAll('h3');
const email = document.querySelectorAll('.email');
const h2 = document.querySelector('h2');

// Set up search input
const searchDiv = document.createElement('div');
const input = document.createElement('input');
const button = document.createElement('button');
searchDiv.appendChild(input);
searchDiv.appendChild(button);
pageHeader.appendChild(searchDiv);
searchDiv.className = 'student-search';
input.placeholder = 'Search for students...';
input.type = 'text';
button.textContent = 'Search';

// Initialize page number elements
const pageDiv = document.createElement('div');
pageDiv.className = 'pagination';
const ul = document.createElement('ul');
ul.className = 'pagination-ul';



/* PAGINATION SET UP
====================*/
const appendPageLinks = (pages, list, searchBoolean) => {
  
   if (pages > 1) {  
      
      // Check if incoming request is a search and set up first page to only display 10 students
      if (searchBoolean) displayStudents(10, list.length, 'none', list);
       

      // Create page numbers for each page of students and set up click event
      for (let i = 0; i < pages; i++ ){
         const li = document.createElement('li');
         const pageNumber = document.createElement('a');
         
         pageNumber.textContent = i + 1;
         pageNumber.textContent == 1 ? pageNumber.className = 'active' : '';
         
         li.appendChild(pageNumber);
         ul.appendChild(li);
         pageDiv.appendChild(ul);
         mainDiv.appendChild(pageDiv);

         pageNumber.addEventListener('click', (e) => {
            h2.textContent = 'Students';
            for (let i = 0; i < pages; i++){
               page[i].className = '';
            };
            pageNumber.className = 'active';

            // Check if request is a search before calling showPage()
            searchBoolean ? showPage(list.length, Number(e.target.text), list) : showPage(list, Number(e.target.text), students); 
         });
      };
   };
};  



/* DISPLAY STUDENTS
===================*/
const showPage = (list, page, selection) => {
   
   const firstStudent = (page * 10) - 10;
   const lastStudent = (page * 10);
   
   // Clear students from page
   displayStudents(0, list, 'none', selection);
   
   // Display ten students per page and remaining on last page
   lastStudent > list ? 
      displayStudents(firstStudent, list, 'block', selection) : displayStudents(firstStudent, lastStudent, 'block', selection);
};


// Extension of showPage()
const displayStudents = (start, end, display, selection) => {
   for (let i = start; i < end; i++){
      selection[i].style.display = display;
   };
};


/* SEARCH QUERY
===============*/
const searchBar = () => { 
   button.addEventListener('click', () => filterNames());
   input.addEventListener('keyup', (e) => filterNames());
};


// Filter student names by letter
const filterNames = () => {
   let stuArr = []
   h2.textContent = 'Students';
   
   if (input.value != ''){
      let filterValue = input.value.toUpperCase();
      let studentList = document.querySelectorAll('.student-details');

      for (let i = 0; i < studentCount; i++){
         let a = studentList[i].getElementsByTagName('h3')[0];
         if(a.innerHTML.toUpperCase().indexOf(filterValue) > -1){
            name[i].parentNode.parentNode.style.display = '';
            stuArr.push(name[i].parentNode.parentNode);           
         }else{
            name[i].parentNode.parentNode.style.display = 'none';
         }; 
      };

      if (stuArr.length === 0) h2.textContent = 'Sorry, no student found by that name'
      let newPages = Math.ceil(stuArr.length / 10);
      while (ul.firstChild) ul.removeChild(ul.firstChild);
      appendPageLinks(newPages, stuArr, true);
   }else{
  
      /* If there is no text in the search box, the application will reset back to the main page with the first 10 students */
      while (ul.firstChild) ul.removeChild(ul.firstChild);
      appendPageLinks(pageCount, studentCount, false)
      displayStudents(0, studentCount, 'block', students)
      displayStudents(10, studentCount, 'none', students)  
   }
}



/* CALL INITIAL FUNCTIONS 
=============================*/

// Create Search Bar
searchBar();

// Show first ten students on main page
displayStudents(10, studentCount, 'none', students);

// Organize list of students into seperate pages
appendPageLinks(pageCount, studentCount, false);