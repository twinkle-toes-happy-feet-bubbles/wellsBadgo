const modalWrapper = document.querySelector('.modal-wrapper');
// modal add
const addModal = document.querySelector('.add-modal');
const addModalForm = document.querySelector('.add-modal .form');

// modal edit
const editModal = document.querySelector('.edit-modal');
const editModalForm = document.querySelector('.edit-modal .form');

const btnAdd = document.querySelector('.btn-add');

const tableposts = document.querySelector('.table-posts');

let id;


// Create element and render posts
const renderpost = doc => {
  const post = `
    <div class='row' data-id='${doc.id}'>
    <a href='post.html?${doc.id}'>
     
      <div id='title'>${doc.data().postTitle}</div>
      <div id='desc'>${doc.data(). Description}</div>
      <div id='time'>${doc.data().date}</div>
      <div id='user'>Post by ${doc.data().author}</div>
      <div>
        <button class="btn btn-edit">Edit</button>
        <button class="btn btn-delete">Delete</button>
      </div>

    </a>
    </div>
    <br>
  `;
  tableposts.insertAdjacentHTML('beforeend', post);

  // Click edit post
  const btnEdit = document.querySelector(`[data-id='${doc.id}'] .btn-edit`);
  btnEdit.addEventListener('click', () => {
    editModal.classList.add('modal-show');

    id = doc.id;
    editModalForm.postTitle.value = doc.data().postTitle;
    editModalForm.Description.value = doc.data().Description;
    editModalForm.date.value = doc.data().date;
    editModalForm.author.value = doc.data().author;

  });

  // Click delete post
  const btnDelete = document.querySelector(`[data-id='${doc.id}'] .btn-delete`);
  btnDelete.addEventListener('click', () => {
    db.collection('posts').doc(`${doc.id}`).delete().then(() => {
      console.log('Document succesfully deleted!');
    }).catch(err => {
      console.log('Error removing document', err);
    });
  });

}

// Click add post button
btnAdd.addEventListener('click', () => {
  addModal.classList.add('modal-show');

  addModalForm.postTitle.value = '';
  addModalForm.Description.value = '';
  addModalForm.date.value = '';
  addModalForm.author.value = '';
});

// post click anyware outside the modal
window.addEventListener('click', e => {
  if(e.target === addModal) {
    addModal.classList.remove('modal-show');
  }
  if(e.target === editModal) {
    editModal.classList.remove('modal-show');
  }
});

// Get all posts
// db.collection('posts').get().then(querySnapshot => {
//   querySnapshot.forEach(doc => {
//     renderpost(doc);
//   })
// });

// Real time listener
db.collection('posts').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if(change.type === 'added') {
      renderpost(change.doc);
    }
    if(change.type === 'removed') {
      let post = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = post.parentElement;
      tableposts.removeChild(tbody);
    }
    if(change.type === 'modified') {
      let post = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = post.parentElement;
      tableposts.removeChild(tbody);
      renderpost(change.doc);
    }
  })
})

// Click submit in add modal
addModalForm.addEventListener('submit', e => {
  e.preventDefault();
  db.collection('posts').add({
    postTitle: addModalForm.postTitle.value,
    Description: addModalForm.Description.value,
    date: addModalForm.date.value,
    author: addModalForm.author.value,
  });
  modalWrapper.classList.remove('modal-show');
});

// Click submit in edit modal
editModalForm.addEventListener('submit', e => {
  e.preventDefault();
  db.collection('posts').doc(id).update({
    postTitle: editModalForm.postTitle.value,
    Description: editModalForm.Description.value,
    date: editModalForm.date.value,
    author: editModalForm.author.value,
  });
  editModal.classList.remove('modal-show');
  
});
