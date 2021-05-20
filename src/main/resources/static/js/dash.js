function openPopup(num){
    document.getElementsByClassName("modal")[num].classList.add("animate__jackInTheBox");
}
function closeSecondModal(){
    document.getElementById("secondModal").classList.add("animate__slideOutDown");
    document.getElementById("whiteBack").style.display = "none";
}  
function clickOnRow(){
    var doc_data = document.getElementsByClassName("detailBtn");
    for(var i=0;i<doc_data.length;i++){
        doc_data[i].addEventListener('click',()=>{
            document.getElementById("secondModal").classList.add("animate__slideInUp");
            document.getElementById("secondModal").style.display = "block";
            document.getElementById("whiteBack").style.display = "block";
            document.getElementById("secondModal").classList.remove("animate__slideOutDown");
        })
    }
}
// function openMessage(bell){
//     if(bell.getElementsByTagName("div")[1].style.display = "none"){
//         bell.getElementsByTagName("div")[0].style.display = "block";
//         bell.getElementsByTagName("div")[1].style.display = "block";
//     }
//     else{
//         bell.getElementsByTagName("div")[0].style.display = "none";
//         bell.getElementsByTagName("div")[1].style.display = "none";
//     }
// }

$(document).ready(function(){
    $(".fa-bell").click(function(){
      $(".triangle").toggle();
      $(".box").toggle();
      $(".userMenu").hide();
      $(".triangle2").hide();
    });
    $(".badge").click(function(){
        $(".triangle").toggle();
        $(".box").toggle();
        $(".userMenu").hide();
      $(".triangle2").hide();
      });
  });

  $(document).ready(function(){
    $("#userMenu").click(function(){
      $(".userMenu").toggle();
      $(".triangle2").toggle();
      $(".triangle").hide();
        $(".box").hide();
    });
  });
  

//   root.style.setProperty('--primary',"dodgerblue");

function allowDoctor(){
  document.getElementById("confirmBox").style.display = "block";
  
}

function logout(){
  localStorage.clear();
  sessionStorage.clear();
  location.reload();
}