document.addEventListener('DOMContentLoaded', (event) => {
    const saveBtn = document.getElementById("saveBtn");
    const modal = document.getElementById("myModal");
    const openModalBtn = document.getElementById("openModalBtn");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
    const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
    const notesList = document.getElementById('notesList');
    const notesTitle = document.getElementById('notesTitle');
    const notesBody = document.getElementById('notesBody');
    const notesSearchBar = document.getElementById('notesSearchBar');
    const signUpLink = document.getElementById('signUpLink');
    const loginLink = document.getElementById('loginLink');

    const toast = document.getElementById('toast');

    let selectedNoteId = null;  // Variable to keep track of the selected note
    let notes = [];  // Array to store the notes

    // Function to format date
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString(); // Format the date as needed
    }

    // Fetch notes from the backend
    fetch('/api/notes')
        .then(response => response.json())
        .then(data => {
            notes = data;  // Store fetched notes
            displayNotes(notes);  // Display notes
        })
        .catch(error => console.error('Error fetching notes:', error));

    // Function to display the notes
    function displayNotes(notesToDisplay) {
        // Clear existing notes
        notesList.innerHTML = '';
        // Populate notes list
        notesToDisplay.forEach(note => {
            const noteItem = document.createElement('div');
            noteItem.classList.add('notes__list-item');
            noteItem.dataset.noteId = note._id;  // Set data-note-id 
            noteItem.innerHTML = `
                <div class="notes__box-title">${note.title}</div>
                <div class="notes__box-body">${note.content}</div>
                <div class="notes__box-date">${formatDate(note.createdAt)}</div>
            `;
            // Add an click event listener to each card
            noteItem.addEventListener('click', () => {
                notesTitle.value = note.title;
                notesBody.value = note.content;
                selectedNoteId = note._id;  // Set the selected note ID
                console.log('Selected note ID:', selectedNoteId);  // Log the selected note ID
            });
            // Add the new note to the top of the sidebar
            notesList.prepend(noteItem);
        });
    }

    // Function to filter notes by title
    function filterNotes() {
        const searchTerm = notesSearchBar.value.toLowerCase();
        const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(searchTerm));
        displayNotes(filteredNotes);
    }

    // Add event listener to the search bar
    notesSearchBar.addEventListener('input', filterNotes);

    // The toast notification 
    function showToast(message, color) {
        toast.textContent = message;
        toast.style.backgroundColor = color;
        toast.className = 'toast show';

        // Hide after 3 seconds
        setTimeout(() => {
            toast.className = 'toast';
        }, 3000);
    }

    // When the user clicks the button, save the note
    saveBtn.onclick = function () {
        console.log('Attempting to save note with ID:', selectedNoteId);  // Log the selected note ID
        if (selectedNoteId) {
            const updatedNote = {
                title: notesTitle.value,
                content: notesBody.value
            };

            // Put request to update a note 
            fetch(`/api/notes/${selectedNoteId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedNote)
            })
                .then(response => response.json())
                .then(data => {
                    // Logs the update function
                    console.log('Note updated:', data);
                    // Show toast notification
                    showToast('Save Successful', '#6411da');
                    // Update the note in the list without re-fetching all notes
                    const noteItems = notesList.getElementsByClassName('notes__list-item');
                    for (let item of noteItems) {
                        if (item.dataset.noteId === selectedNoteId) {
                            item.querySelector('.notes__box-title').textContent = updatedNote.title;
                            item.querySelector('.notes__box-body').textContent = updatedNote.content;
                            break;
                        }
                    }
                    // Refresh the home page 
                    setTimeout(() => {
                        window.location.href = '/home/home.html';
                    }, 500);
                })
                .catch(error => console.error('Error updating note:', error));
        } else {
            showToast('No note selected', '#FF0000');
        }
    }

    // When the user clicks the button, open the modal
    openModalBtn.onclick = function () {
        modal.style.display = "block";
    }

    // When the user clicks on x, close the modal
    closeModalBtn.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks on the No button, close the modal
    cancelDeleteBtn.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    signUpLink.addEventListener('click', () => {
        window.location.href = '/signup/signup.html'; // Navigate to signup page
    });

    loginLink.addEventListener('click', () => {
        window.location.href = '/login/login.html'; // Navigate to login page
    });

    // When the user clicks on the Yes button, perform delete action and close the modal
    confirmDeleteBtn.onclick = function () {
        console.log('Attempting to delete note with ID:', selectedNoteId);  // Log the selected note ID

        if (selectedNoteId) {
            // Delete request tp delete the note
            fetch(`/api/notes/${selectedNoteId}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        // Logs the delete function
                        console.log('Note deleted successfully');
                        // Show toast notification
                        showToast('Delete Successful', '#FF0000');
                        modal.style.display = "none";
                        notesTitle.value = '';
                        notesBody.value = '';

                        // Remove the note from the list without re-fetching all notes
                        const noteItemToRemove = notesList.querySelector(`[data-note-id="${selectedNoteId}"]`);
                        if (noteItemToRemove) {
                            notesList.removeChild(noteItemToRemove);
                            selectedNoteId = null;  // Clear the selectedNoteId after removing the note
                        } else {
                            console.error('Could not find note in the list to remove');
                        }
                    } else {
                        console.error('Failed to delete note:', response.status);
                        showToast('Failed to delete note', '#FF0000');
                    }
                })
                .catch(error => {
                    console.error('Error deleting note:', error);
                    showToast('Error deleting note', '#FF0000');
                });
        } else {
            showToast('No note selected', '#FF0000');
        }
    };
});

// Sidebar Toggle for responsiveness of the application
function toggleSidebar() {
    const sidebar = document.querySelector('.notes__sidebar');
    sidebar.classList.toggle('visible');
}



