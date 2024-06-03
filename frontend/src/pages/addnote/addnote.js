document.addEventListener('DOMContentLoaded', (event) => {
    const saveBtn = document.getElementById("saveBtn")
    const modal = document.getElementById("myModal");
    const openModalBtn = document.getElementById("openModalBtn");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
    const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");


    // When the user click the button, save the note
    saveBtn.onclick = function () {
        console.log('Note Saved');
        // Redirct user back to the home page
        setTimeout(() => {
            window.location.href = '/frontend/src/pages/home/home.html';
        }, 200);
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

        // Redirct user back to the home page
        setTimeout(() => {
            window.location.href = '/frontend/src/pages/home/home.html';
        }, 200);
    }
});



