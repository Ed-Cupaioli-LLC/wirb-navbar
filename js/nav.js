//Toggle Search
function toggleSearch() {
  const searchToggle = document.querySelector(".site-nav__search-toggle");
  const searchInput = document.querySelector("#header-search input[name='keywords']");
  const searchForm = document.querySelector("form#header-search");
  if (searchToggle.classList.contains('active')) {
      if (searchInput.value.length > 0) {
        searchForm.submit();
      } else {
        searchToggle.classList.remove("active");
        searchForm.classList.remove("active");
        searchInput.blur();
      }
  } else {
    searchToggle.classList.add('active');
    searchForm.classList.add("active");
    searchInput.focus();
  }
} 
//close out of modals
document.addEventListener('click',function(e) {
  //subscribe dropdown
  const isSubDropdown = e.target.closest(".subscribe-dropdown.active *");
  const subDropdown = document.querySelectorAll(".subscribe-dropdown");
  const isSubToggle = e.target.classList.contains('subscribe-toggle');
  const subToggle = document.querySelectorAll(".subscribe-toggle");
  if (isSubDropdown === null && !isSubToggle) {
    subDropdown.forEach(el => {
      if (el.classList.contains('active')) {
        el.classList.remove("active");
      }
    });
    subToggle.forEach(el => {
      if (el.classList.contains('active')) {
        el.classList.remove("active");
      }
    });
  }
  //search form - desktop only
  const searchForm = e.target.closest(".search-form.active *");
  const searchToggle = e.target.closest(".site-nav__search-toggle *");
  if (searchForm === null && searchToggle === null) {
    document.querySelector(".search-form").classList.remove("active");
    document.querySelector(".site-nav__search-toggle").classList.remove("active");
  }
});

//toggle subscribe form
const subscribeToggle = document.querySelectorAll(".subscribe-toggle");
subscribeToggle.forEach((el) => {
  el.addEventListener("click", (event) => {
    const formId = el.dataset.form;
    const dropdown = document.querySelector(".subscribe-dropdown[data-form='"+formId+"']");
    const emailInput = dropdown.querySelector('input[name="EMAIL"]');
    el.classList.toggle("active");
    dropdown.classList.toggle("active");
    if (dropdown.classList.contains('active')) {
      emailInput.focus();
    } else {
      emailInput.blur();
    }  
  });
});



//Submit Subscribe form
$(".subscribe-dropdown__form").submit(function (e) {
  e.preventDefault();
  const form = $(this).parents('.subscribe-dropdown').data('form');
  console.log(form);
  $.ajax({
    url: "https://us7.list-manage.com/subscribe/post-json?u=12546ad104d491a132c3d67d9&id=c0dc677ba8&subscribe=Subscribe&c=?",
    type: "GET",
    data: $(this).serialize(),
    dataType: "json",
    success: function (data) {
      console.log(data);
      if (data.result === "error") {
        $(".subscribe-dropdown[data-form='"+form+"']")
          .find(".subscribe-dropdown__form-error")
          .html(data.msg);
      } else if (data.result === "success") {
        $(".subscribe-dropdown[data-form='" + form + "']")
          .find("fieldset")
          .slideUp();
        $(".subscribe-dropdown[data-form='" + form + "']")
          .find(".subscribe-dropdown__form-success")
          .html(data.msg)
          .slideDown();
          ga('send', {
            hitType: 'event',
            eventCategory: 'Subscribe Form',
            eventAction: 'Form Submission',
            eventLabel: 'Navbar Email Signup'
          });
      }
    },
    error: function (data) {
      console.log(data);
      window.open(mcUrl + "/subscribe/post?u=" + mcUserId + "&id=" + mcListId + "&subscribe=Subscribe&EMAIL=" + email, "_blank");
    },
  });
});

function toggleMenu() {
  const linkToggle = document.querySelector(".site-nav__link-toggle");
  const linksCol = document.querySelector(".mobile-menu");
  linkToggle.classList.toggle("active");
  linksCol.classList.toggle("active");
}

  

