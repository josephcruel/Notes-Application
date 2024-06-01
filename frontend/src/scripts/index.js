document.addEventListener('DOMContentLoaded', (event) => {
    const modal = document.getElementById("myModal");
    const openModalBtn = document.getElementById("openModalBtn");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
    const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");


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

    // When the user clicks on the Yes button, perform delete action and close the modal
    confirmDeleteBtn.onclick = function () {
        // Add your delete logic here
        console.log('Note deleted');
        modal.style.display = "none";
    }
});



