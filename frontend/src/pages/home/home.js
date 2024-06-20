document.addEventListener('DOMContentLoaded', () => {
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

    // Fetch notes from the backend with authentication token
    function fetchNotes() {
        const token = localStorage.getItem('token');
        fetch('/api/notes', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch notes');
            }
            return response.json();
        })
        .then(data => {
            notes = data;  // Store fetched notes
            displayNotes(notes);  // Display notes
        })
        .catch(error => {
            console.error('Error fetching notes:', error);
            showToast('Error fetching notes', '#FF0000');
        });
    }

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
            // Add a click event listener to each note item
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

    // The toast notification function
    function showToast(message, color) {
        toast.textContent = message;
        toast.style.backgroundColor = color;
        toast.className = 'toast show';

        // Hide after 3 seconds
        setTimeout(() => {
            toast.className = 'toast';
        }, 3000);
    }

    // Save note function
    saveBtn.onclick = function () {
        console.log('Attempting to save note with ID:', selectedNoteId);  // Log the selected note ID
        if (selectedNoteId) {
            const updatedNote = {
                title: notesTitle.value,
                content: notesBody.value
            };

            const token = localStorage.getItem('token');

            // Put request to update a note with token
            fetch(`/api/notes/${selectedNoteId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedNote)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update note');
                }
                return response.json();
            })
            .then(data => {
                console.log('Note updated:', data);  // Log the updated note
                showToast('Save Successful', '#6411da');  // Show toast notification
                // Update the note in the list without re-fetching all notes
                const noteItemToUpdate = notesList.querySelector(`[data-note-id="${selectedNoteId}"]`);
                if (noteItemToUpdate) {
                    noteItemToUpdate.querySelector('.notes__box-title').textContent = updatedNote.title;
                    noteItemToUpdate.querySelector('.notes__box-body').textContent = updatedNote.content;
                }
                // Clear fields and reset selectedNoteId
                notesTitle.value = '';
                notesBody.value = '';
                selectedNoteId = null;
            })
            .catch(error => {
                console.error('Error updating note:', error);
                showToast('Error updating note', '#FF0000');
            });
        } else {
            showToast('No note selected', '#FF0000');
        }
    };

    // Open modal button
    openModalBtn.onclick = function () {
        modal.style.display = "block";
    };

    // Close modal button
    closeModalBtn.onclick = function () {
        modal.style.display = "none";
    };

    // Cancel delete button
    cancelDeleteBtn.onclick = function () {
        modal.style.display = "none";
    };

    // Close modal on window click
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    // Sign up link navigation
    signUpLink.addEventListener('click', () => {
        window.location.href = '/signup/signup.html'; // Navigate to signup page
    });

    // Login link navigation
    loginLink.addEventListener('click', () => {
        window.location.href = '/login/login.html'; // Navigate to login page
    });

    // Confirm delete button
    confirmDeleteBtn.onclick = function () {
        console.log('Attempting to delete note with ID:', selectedNoteId);  // Log the selected note ID

        if (selectedNoteId) {
            const token = localStorage.getItem('token');

            // Delete request to delete a note with token
            fetch(`/api/notes/${selectedNoteId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                if (response.ok) {
                    console.log('Note deleted successfully');  // Log success
                    showToast('Delete Successful', '#FF0000');  // Show toast notification
                    modal.style.display = "none";  // Close modal
                    // Remove the note from the list without re-fetching all notes
                    const noteItemToRemove = notesList.querySelector(`[data-note-id="${selectedNoteId}"]`);
                    if (noteItemToRemove) {
                        notesList.removeChild(noteItemToRemove);
                        selectedNoteId = null;  // Clear selectedNoteId
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

    // Fetch notes when DOM content is loaded
    fetchNotes();
});

// Sidebar toggle function
function toggleSidebar() {
    const sidebar = document.querySelector('.notes__sidebar');
    sidebar.classList.toggle('visible');
}


