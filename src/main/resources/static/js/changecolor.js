let root = document.documentElement;

  $(document).ready(function(){
    $(".colorTheme").click(function(){
        $(".colorOption").toggle();
    });
  });
  function changeColor(element){
    root.style.setProperty('--primary',window.getComputedStyle(element).backgroundColor);
    localStorage.setItem("bgcolor",window.getComputedStyle(document.documentElement).getPropertyValue('--primary'));
  }
  root.style.setProperty('--primary',localStorage.getItem("bgcolor"));