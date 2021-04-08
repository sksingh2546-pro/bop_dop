function closemodal() {
    document.getElementById("confirmBox").style.display = "none";
    document.getElementById("backCover").style.display = "none";
}

function openmodal(element) {
    document.getElementById("yes").addEventListener('click', () => {
        closemodal();
        deleteHandler(element);
    });
    document.getElementById("cancel").addEventListener('click', () => {
        closemodal();
    })
    document.getElementById("confirmBox").style.display = "block";
    document.getElementById("backCover").style.display = "block";
}