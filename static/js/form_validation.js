$("#submit").click(function (event) {
  // Prevent redirection with AJAX for contact form
  var form = $("#contactform");
  var form_id = "contactform";
  var url = form.prop("action");
  var type = form.prop("method");
  var formData = getContactFormData(form_id);

  // submit form via AJAX
  send_form(form, form_id, url, type, modular_ajax, formData);
});

function getContactFormData(form) {
  // creates a FormData object and adds chips text
  var formData = new FormData(document.getElementById(form));

  // Printing the data entered within form
  //   for (var [key, value] of formData.entries()) {
  //     console.log("formData", key, value);
  //   }
  return formData;
}

function send_form(form, form_id, url, type, inner_ajax, formData) {
  // form validation and sending of form items

  if (form[0].checkValidity() && isFormDataEmpty(formData) == false) {
    // checks if form is empty
    event.preventDefault();

    // inner AJAX call
    inner_ajax(url, type, formData);
  } else {
    // for each invalid input element (form field) return error
    console.log("error");
  }
}

function isFormDataEmpty(formData) {
  // checks for all values in formData object if they are empty
  for (var [key, value] of formData.entries()) {
    if (key != "csrf_token") {
      if (value != "" && value != []) {
        return false;
      }
    }
  }
  return true;
}

function modular_ajax(url, type, formData) {
  $.ajax({
    url: "/",
    type: "Post",
    data: formData,
    processData: false,
    contentType: false,
    beforeSend: function () {
      // show the preloader (progress bar)
      // $("#form-response").html(
      //   "<div class='progress'><div class='indeterminate'></div></div>"
      // );
    },
    complete: function () {
      // hide the preloader (progress bar)
      $("#form-response").html("");
    },
    success: function (data) {
      if (!$.trim(data.feedback)) {
        // response from Flask is empty
        toast_error_msg = "An empty response was returned.";
        toast_category = "danger";
      } else {
        // response from Flask contains elements
        toast_error_msg = data.name;
        toast_category = data.category;
      }
    },

    error: function (xhr) {
      console.log("error. see details below.");
      console.log(xhr.status + ": " + xhr.responseText);
      toast_error_msg = "An error occured";
      toast_category = "danger";
    },
  }).done(function () {
    // clear fields and back to top
    setTimeout(function () {
      // Back to top
      $(document).ready(function () {
        $(this).scrollTop(0);
      });
      // wait for (x) sec
      window.location.reload();
      // TODO: Throw message => email sentw
    }, 3000);
    console.log("data sent");
  });
}

var csrf_token = "{{ csrf_token() }}";

$.ajaxSetup({
  beforeSend: function (xhr, settings) {
    if (
      !/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) &&
      !this.crossDomain
    ) {
      xhr.setRequestHeader("X-CSRFToken", csrf_token);
    }
  },
});
