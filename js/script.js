/* GLOBAL VARIABLES
===================*/
const mainDiv = document.querySelector('.page');
const pageHeader = document.querySelector('.page-header');
const students = document.querySelectorAll('.student-item');
const list = document.querySelectorAll('.student-item').length;
const name = document.querySelectorAll('h3')
const email = document.querySelectorAll('.email')
const h2 = document.querySelector('h2')

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


// Initialize page numbers div
const pageDiv = document.createElement('div');
pageDiv.className = 'pagination';
const ul = document.createElement('ul');
const pages = Math.ceil(list / 10);


/* SET UP PAGE LINKS
====================*/
const appendPageLinks = (list) => {
   if (pages > 1) {  

      // Create/append elements for each page
      for (let i = 0; i < pages; i++ ){
         const li = document.createElement('li');
         const pageNumber = document.createElement('a');
         const page = document.getElementsByTagName('a');
         pageNumber.textContent = i + 1;
         pageNumber.textContent == 1 ? pageNumber.className = 'active' : '';
         li.appendChild(pageNumber);
         ul.appendChild(li);
         pageDiv.appendChild(ul);
         mainDiv.appendChild(pageDiv);

      // Functionality for page numbers
         pageNumber.addEventListener('click', (e) => {
            h2.textContent = 'Students';
            for (let i = 0; i < pages; i++){
               page[i].className = '';
            };
            pageNumber.className = 'active';
            showPage(list, Number(e.target.text)) ;
         });
      };
   };
};  



/* DISPLAY STUDENTS
===================*/
const showPage = (list, page) => {
   
   const firstStudent = (page * 10) - 10;
   const lastStudent = (page * 10);
   
   // Clear students from page
   displayStudents(0, list, 'none');

   // Display ten students per page and remaining on last page
   lastStudent > list ? displayStudents(firstStudent, list, 'block') : displayStudents(firstStudent, lastStudent, 'block');
 
};

// Extension of showPage()
const displayStudents = (start, end, display) => {
   for (let i = start; i < end; i++){
      students[i].style.display = display;
   };
};

/* SEARCH QUERY
===============*/
const searchBar = () => {
   
   button.addEventListener('click', () => {
      searchQuery()  
   })
  
   input.addEventListener('keyup', (e) => {
      if (e.keyCode == 13){
         searchQuery()
      }else{
         filterNames()
      }
   })

   const searchQuery = () => {
      
      if (input.value !== ''){
         let student = input.value;
         input.value = '';
         let foundStudent = false;
         for (var i = 0; i < list; i++){  
            if(name[i].textContent.includes(student) || email[i].textContent.includes(student)){
               name[i].parentNode.parentNode.style.display = 'block';
               foundStudent = true;
            }
         }
         if (foundStudent == false) h2.textContent = 'Sorry, no student found by that name';
      }else{
         h2.textContent = 'Please enter a name in the search field:';
      }
   }   
}

const filterNames = () => {

   h2.textContent = 'Students'
   if (input.value != ''){
      let filterValue = input.value.toUpperCase();
      let studentList = document.querySelectorAll('.student-details')
      for (let i = 0; i < list; i++){
         let a = studentList[i].getElementsByTagName('h3')[0];
         if(a.innerHTML.toUpperCase().indexOf(filterValue) > -1){
            name[i].parentNode.parentNode.style.display = '';
         }else{
            name[i].parentNode.parentNode.style.display = 'none';
         }
      }
   }else{
      /* If there is no text in the input box, the application will reset back to the main page with the first 10 students */
      displayStudents(0, list, 'block')
      displayStudents(10, list, 'none')  
   }
}


/* CALL OUR INITIAL FUNCTIONS 
=============================*/

// Create Search Bar
searchBar()

// Show first ten students on main page
displayStudents(10, list, 'none')

// Organize list of students into seperate pages
appendPageLinks(list)

