const title = document.getElementById('title')
const desc = document.getElementById('description')
const time = document.getElementById('time')
const author = document.getElementById('author')

const urlData = window.location.search

    docId = urlData.substring(1);

    console.log(docId)

const tableposts = document.querySelector('.table-posts');

let id;

// Create element and render posts
const renderpost = doc => {
  const post = `
    <div class='row' data-id='${docId}'>
      <div id='title'>${doc.data().postTitle}</div>
      <div id='desc'>${doc.data(). Description}</div>
      <div id='date'>${doc.data().date}</div>
      <div id='by'>${doc.data().author}</div>
      
    </div>
    <br>
    <hr>
  `;
  tableposts.insertAdjacentHTML('beforeend', post);

  

  

}




/*Real time listener
db.collection('posts').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if(change.type === 'added') {
      renderpost(change.doc);
    }
    
    
  })
})
*/



firebase
  .firestore()
  .collection("posts")
  .doc(docId)
  .get()
  .then((docRef) => {
    const allPosts = [docRef.data()]
    const post = allPosts[0]
    console.log(post)
    title.innerHTML = post.postTitle;
    desc.innerHTML = post.Description;
    time.innerHTML = 'Posted on ' + post.date;
    author.innerHTML = 'By User ' + post.author
  })
  .catch((error) => {
    console.log('error')
  })



/*
var fullPost = db.collection("posts").doc(docId);

fullPost.get().then(function(doc) {
    if (doc.exists) {
        renderpost([doc.data()]);
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
*/
