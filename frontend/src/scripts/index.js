// Sidebar Toggle for responsiveness of the application
function toggleSidebar() {
    const sidebar = document.querySelector('.notes__sidebar');
    sidebar.classList.toggle('visible');
}

// Toast Notifications for buttons
function showToast(message, color) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.backgroundColor = color;
    toast.className = 'toast show';
    
    setTimeout(() => {
        toast.className = 'toast';
    }, 3000); // Hide after 3 seconds
}

// Save toast notification
function saveNote() {
    // Show toast notification
    showToast('Save Successful', '#007BFF');
}

// Delete toast notification
function deleteNote() {
    // Show toast notification
    showToast('Delete Successful', '#FF0000');
}