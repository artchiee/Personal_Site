// projects portfolio feltiring
jQuery(function ($) {
  var $container = $(".sp-simpleportfolio-items");

  $(window).ready("onload", function () {
    var $sizer = $container.find(".shuffle__sizer");

    $container.shuffle({
      itemSelector: ".sp-simpleportfolio-item",
      sequentialFadeDelay: 150,
      sizer: $sizer,
    });
  });

  // appply Filters
  $(".sp-simpleportfolio-filter li a").on("click", function (event) {
    event.preventDefault();
    var $self = $(this);
    var $this = $(this).parent();

    if ($this.hasClass("active")) {
      return;
    }

    $self.closest("ul").children().removeClass("active");
    $self.parent().addClass("active");

    var $local = $self
      .closest(".sp-simpleportfolio")
      .children(".sp-simpleportfolio-items");

    $local.shuffle("shuffle", $this.data("group"));
  });
});
// // Scrolling top (smooth scrolling)
// jQuery(window).on("load", function () {
//   // Preloader
//   jQuery(".loading").addClass("loading-end").fadeOut(1000);
// });

jQuery(document).ready(function () {
  jQuery(window).scroll(function () {
    if (jQuery(this).scrollTop() > 100) {
      jQuery("#scrolltotop").fadeIn();
    } else {
      jQuery("#scrolltotop").fadeOut();
    }
  });
  jQuery("#scrolltotop").click(function () {
    jQuery("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  });
});

//    ------------------------------------
// FadeIn animation on document load
/* WOW ANIMATE JS */
wow = new WOW({
  animateClass: "animated",
  offset: 100,
});
wow.init();
/* WOW ANIMATE JS */

//<------------- Navbar Styling -------->
// when scroll to (x) changle navbar coloring
jQuery(function () {
  "use strict";

  var wind = jQuery(window);

  // scrollIt
  jQuery.scrollIt({
    upKey: 38, // key code to navigate to the next section
    downKey: 40, // key code to navigate to the previous section
    easing: "swing", // the easing function for animation
    scrollTime: 600, // how long (in ms) the animation takes
    activeClass: "active", // class given to the active nav element
    onPageChange: null, // function(pageIndex) that is called when page is changed
    topOffset: -60, // offste (in px) for fixed top navigation
  });

  // close navbar-collapse when (a) clicked
  jQuery(".nav a").on("click", function () {
    jQuery(".navbar-collapse").removeClass("in").addClass("collapse");
  });

  // navbar scrolling background
  wind.on("scroll", function () {
    var bodyScroll = wind.scrollTop(),
      navbar = jQuery(".navbar-dark");

    if (bodyScroll > 300) {
      navbar.addClass("nav-scroll");
    } else {
      navbar.removeClass("nav-scroll");
    }
  });
});

// <------------- Navbar animation -------->
// on click highlight nav-link selected
$(document).ready(function () {
  "use strict";

  $("ul.navbar-nav > li").click(function (e) {
    e.preventDefault();
    $("ul.navbar-nav > li").removeClass("active");
    $(this).addClass("active");
  });
});

// onScroll highlight nav-link
// Cache selectors
var lastId,
  topMenu = $("#top-menu"),
  topMenuHeight = topMenu.outerHeight() + 15,
  // All list items
  menuItems = topMenu.find("a"),
  // Anchors corresponding to menu items
  scrollItems = menuItems.map(function () {
    var item = $($(this).attr("href"));
    if (item.length) {
      return item;
    }
  });

// Bind to scroll
$(window).scroll(function () {
  // Get container scroll position
  var fromTop = $(this).scrollTop() + topMenuHeight;

  // Get id of current scroll item
  var cur = scrollItems.map(function () {
    if ($(this).offset().top < fromTop) return this;
  });
  // Get the id of the current element
  cur = cur[cur.length - 1];
  var id = cur && cur.length ? cur[0].id : "";

  if (lastId !== id) {
    lastId = id;
    // Set/remove active class
    menuItems
      .parent()
      .removeClass("active")
      .end()
      .filter("[href='#" + id + "']")
      .parent()
      .addClass("active");
  }
});
// <------------- End of Navbar Stylign  -------->
