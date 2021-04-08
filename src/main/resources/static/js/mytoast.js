function mytoast(message,bg){
    Toastify({
        text: message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "right", 
        backgroundColor: bg,
        stopOnFocus: true,
      }).showToast();
}