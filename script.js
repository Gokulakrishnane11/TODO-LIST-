document.addEventListener("DOMContentLoaded", (event) => {
  // Call the theme function to set the initial theme
  theme();

  // Select elements from the DOM
  const todoinput = document.querySelector("#input-value");
  const todoList = document.querySelector("#checklist");
  const addButton = document.querySelector(".Btn");
  const wrongText = document.querySelector(".wrong");
  const quotes = document.querySelector(".quotes");

  // Call the loadTodos function to load saved todos from local storage
  loadTodos();

  // Event listener for adding todos when the add button is clicked
  addButton.addEventListener("click", addtodo);

  // Event listener for adding todos when the Enter key is pressed
  todoinput.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
          event.preventDefault();
          addtodo();
      }
  });

  // Function to add a todo item
  function addtodo(event) {
      let inputtext = todoinput.value.trim(); // Trim whitespace from input text
    
      // If the input text is empty, show the warning text and return
      if (inputtext === "" || inputtext === null) {
          wrongText.style.display = "block";
          return;
      }

      // Call the createTodoItem function to add the new todo item
      createTodoItem(inputtext, false); // Pass the text and unchecked state
      todoinput.value = ""; // Clear the input field
      saveTodos(); // Save the updated list to local storage
      wrongText.style.display = "none"; // Hide the warning text
  }

  // Function to create a new todo item
  function createTodoItem(text, isChecked) {
      let newlist = document.createElement("div"); // Create a new div element for the todo item
      newlist.classList.add('todo-list'); // Add class for styling

      // Set the inner HTML of the new list item
      newlist.innerHTML = `
          <input value="${text}" name="r" type="checkbox" id="${text}" ${isChecked ? 'checked' : ''}>
          <label for="${text}">${text}</label><i class="fa-solid fa-trash delete"></i>
      `;
      // Append the new list item to the todo list
      todoList.appendChild(newlist);

      // Add event listener for the checkbox
      newlist.querySelector('input[type="checkbox"]').addEventListener("change", function() {
          // Toggle the 'done' class when the checkbox is clicked
          this.parentElement.classList.toggle('done');
          // Save the updated list to local storage
          saveTodos();
      });
  }

  // Event listener for deleting todos
  todoList.addEventListener("click", (event) => {
      if (event.target.classList.contains("delete")) { // Check if the clicked element has the 'delete' class
          event.target.parentElement.remove(); // Remove the todo item
          saveTodos(); // Save the updated list to local storage
      }
  });

  // Function to save todos to local storage
  function saveTodos() {
      // Extract todo text and checked state from DOM elements
      const todos = Array.from(document.querySelectorAll(".todo-list")).map(item => {
          return {
              text: item.querySelector("label").textContent, // Get the text of the todo item
              checked: item.querySelector('input[type=checkbox]').checked // Get the checked state of the todo item
          };
      });
      // Store the todos array in local storage
      localStorage.setItem("todos", JSON.stringify(todos));
  }

  // Function to load todos from local storage
  function loadTodos() {
      const storedTodos = JSON.parse(localStorage.getItem("todos")) || []; // Get todos from local storage or set an empty array
      todoList.innerHTML = ''; // Clear existing todos

      // Create each todo item from the stored todos
      storedTodos.forEach(todo => createTodoItem(todo.text, todo.checked));
  }

  // Function to handle theme switching
  function theme() {
      const toggleSwitch = document.querySelector(".switch"); // Select the theme toggle switch

      // Get the current theme from local storage or set default to 'light'
      const currentTheme = localStorage.getItem("theme") || "light";

      // Set the body attribute to the current theme
      document.body.setAttribute("data-theme", currentTheme);
      // Set the toggle switch checked state based on the current theme
      toggleSwitch.checked = currentTheme === "dark";

      // Add event listener for the theme toggle switch
      toggleSwitch.addEventListener("change", function (e) {
          const newTheme = e.target.checked ? "dark" : "light"; // Determine the new theme
          document.body.setAttribute("data-theme", newTheme); // Set the body attribute to the new theme
          localStorage.setItem("theme", newTheme); // Save the new theme to local storage
      });
  }

  // ^ quotes 

  let day=new Date().getDay()

  if(day===0){
    quotes.innerHTML="Good Sunday! Winners never quit, and quitters never win. Don't forget The greatest wealth is health."
  }
  else if(day===1){
    quotes.innerHTML="Happy Monday! The best way to predict the future is to create it. Don't forget to have a good breakfast."
  }
  else if(day===2){
    quotes.innerHTML="Brilliant Tuesday! You create opportunities by performing, not complaining. Don't forget to take a probiotic daily."
  }
  else if(day===3){
    quotes.innerHTML="Good Wednesday! Don’t think just do. Don't forget to get enough sleep."
  }
  else if(day===4){
    quotes.innerHTML="Great Thursday! You must expect great things of yourself before you can do them. Don't forget to eat real food."
  }
  else if(day===5){
    quotes.innerHTML="Excellent Friday! Change your thoughts and you change your world. Don't forget to do the physical activities."
  }
  else if(day===6){
    quotes.innerHTML="Good Saturday! Nothing will work unless you do. Don't forget to take a break."
  }
  else{
    quotes.innerHTML="Hello! Stay focused and don't forget to enjoy your work. Don't forget to take a break."
  }

  
});
