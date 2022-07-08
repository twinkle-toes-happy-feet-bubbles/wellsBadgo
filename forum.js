console.log('working')
// Initialize variables


var yesPop = document.getElementById('popupYes')

var noPop = document.getElementById('popupNo')

var userId = localStorage.getItem("uid")

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); 

//January is 0!

var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

var postForm = document.getElementById('forum')

var titleBox = document.getElementById('Ptitle')

var descriptionBox = document.getElementById('Pdescription')

var postBtn = document.getElementById('postBtn')


 // Click submit in add modal
 postForm.addEventListener('submit', e => {
   e.preventDefault();
   console.log('Event working')
   //, validation of message 
   
  var title = titleBox.value;
  var desc = descriptionBox.value;
  if (title == '' && desc == '') {
    console.log('if case')
    setTimeout(function(){
    noPop.style.display='block';
  },1000)

  setTimeout(function(){
    console.log('if case timeout')
    window.location.replace('home.html')
  },1000)
  } 
  else {
    console.log('else case')
      db.collection('posts').add({
        postTitle: title,
        Description: desc,
        date: today,
        author: userId
      });
      
      
  setTimeout(function(){
    console.log('else case timeout')
    yesPop.style.display='block';
  },1000)
  setTimeout(function(){
    window.location.replace('home.html')
  },2000)
  }
  

   
   
   
   
   
   
   
   
   
   
   
  
 });
  





