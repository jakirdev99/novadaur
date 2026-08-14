/* ============================================================ popup interaction ============================================================ */
$(document).ready(function () {

  const nextButton = document.getElementById("popup");
  const formContainer = document.querySelector(".ndpet-form");

  function toggleFormBlock() {
    if (window.innerWidth < 993) {
      formContainer.classList.toggle("show", nextButton.checked);
    }
  }

  // Automatically open form when visiting a later step URL
  const pathArray = window.location.pathname.split("/").filter(Boolean);
  const currentStep = Number(pathArray[pathArray.length - 1]);

  if (currentStep > 1) {
    nextButton.checked = true;
  }
  // Initial state
  toggleFormBlock();

  // Update when button changes
  nextButton.addEventListener("change", toggleFormBlock);

  // Update on resize
  window.addEventListener("resize", toggleFormBlock);

});
/* ============================================================ x ============================================================ */

/* ============================================================ form interaction handling ============================================================ */

$(document).ready(function () {

  // remove form state issues when using browser back button
  window.addEventListener("pageshow", function () {
    const pathArray = window.location.pathname.split("/").filter(Boolean);
    const currentStep = pathArray[pathArray.length - 1];

    if (["1", "2", "3"].includes(currentStep)) {
      $("#form_4").remove();
      $(".en__component.en__component--formblock").show();
    }
  });

  // remove validation error for text fields
  function clearFieldError(inputSelector, fieldSelector) {
    $(inputSelector).on("keyup", function () {
      if ($(this).val().trim() !== "") {
        $(fieldSelector)
          .find(".en__field__error")
          .hide();

        $(fieldSelector)
          .removeClass("en__field--validationFailed");
      }
    });
  }

  // text fields
  clearFieldError(
    "#en__field_supporter_firstName",
    ".en__field--firstName"
  );

  clearFieldError(
    "#en__field_supporter_lastName",
    ".en__field--lastName"
  );

  clearFieldError(
    "#en__field_supporter_NOT_TAGGED_42",
    ".en__field--NOT_TAGGED_42"
  );

  clearFieldError(
    "#en__field_supporter_phoneNumber2",
    ".en__field--phoneNumber2"
  );

  clearFieldError(
    "#en__field_supporter_emailAddress",
    ".en__field--emailAddress"
  );

  // remove validation error for dropdowns
  function clearDropdownError(selectSelector, fieldClass) {

    function clearError() {
      const value = $(selectSelector).val();

      if (value === "0" || value === "1") {
        const field = $(selectSelector).closest(".en__field");

        field.find(".en__field__error").remove();
        field.removeClass("en__field--validationFailed");
      }
    }

    $(selectSelector).on("change", clearError);

    $(fieldClass).on(
      "click",
      ".select-items div, .select-selected",
      function () {
        setTimeout(clearError, 10);
      }
    );
  }

  // dropdown fields
  clearDropdownError(
    "#en__field_supporter_questions_2103481",
    ".en__field--2103481"
  );

  clearDropdownError(
    "#en__field_supporter_questions_2103495",
    ".en__field--2103495"
  );

  clearDropdownError(
    "#en__field_supporter_questions_2103496",
    ".en__field--2103496"
  );

});

/* ============================================================ x ============================================================ */

/* ============================================================ from UI enhancements, custom dropdowns, floating labels and address autocomplete ============================================================ */
$(document).ready(function () {
  initFloatLabels();
});

// add floating label behavior
function initFloatLabels() {
    $(".en__field").each(function () {
        const field = $(this);
        const input = field.find(".en__field__input");
        function checkValue() {
            field.toggleClass(
                "populated",
                input.val().trim() !== ""
            );
        }
        checkValue();
        input.on("keyup change", checkValue);

    });

}

// google address autocomplete, google fills address related EN fields

function initAddressAutocomplete() {


    const addressInput = document.getElementById(
        "en__field_supporter_NOT_TAGGED_2"
    );


    if (!addressInput || typeof google === "undefined") {
        return;
    }


    const autocomplete =
        new google.maps.places.Autocomplete(
            addressInput,
            {
                types: ["geocode"],
            }
        );


    autocomplete.setFields([
        "address_component"
    ]);



    autocomplete.addListener(
        "place_changed",
        function () {


            const place =
                autocomplete.getPlace();



            if (!place.address_components) {
                return;
            }


            clearAddressErrors();


            fillAddressFields(
                place.address_components
            );


        }
    );

}

// map google address data to en fields

function fillAddressFields(components) {


    components.forEach(function (component) {


        const type = component.types[0];


        switch (type) {


            case "street_number":

                setFieldValue(
                    "#en__field_supporter_address1",
                    component.long_name
                );

            break;



            case "route":

                appendAddress(
                    component.long_name
                );

            break;



            case "locality":

                setFieldValue(
                    "#en__field_supporter_city",
                    component.long_name
                );

            break;



            case "administrative_area_level_1":

                setSelectValue(
                    "#en__field_supporter_region",
                    component.long_name
                );

            break;



            case "postal_code":

                setFieldValue(
                    "#en__field_supporter_postcode",
                    component.long_name
                );

            break;



            case "country":

                setSelectValue(
                    "#en__field_supporter_country",
                    component.short_name
                );

            break;


        }


    });

}



/* ============================================================
   FIELD HELPERS
   ============================================================ */


function setFieldValue(selector, value) {

    $(selector)
        .val(value)
        .trigger("change");

}



function setSelectValue(selector, value) {

    $(selector)
        .val(value)
        .trigger("change");

}



function appendAddress(value) {


    const field =
        $("#en__field_supporter_address1");


    const current =
        field.val();


    field
        .val(
            current
            ? current + " " + value
            : value
        )
        .trigger("change");

}





/* ============================================================
   REMOVE ADDRESS VALIDATION ERROR
   ============================================================ */


function clearAddressErrors() {


    const addressField =
        $(".en__field--NOT_TAGGED_2");


    addressField
        .find(".en__field__error")
        .remove();


    addressField
        .removeClass(
            "en__field--validationFailed"
        );

}
/* ============================================================ x ============================================================ */


async function mySubmitFunction() {
  try {
    var pathArray = window.location.pathname.split("/");
    var currentId = pathArray[pathArray.length - 1];

    // collect data always
    // await collectAndPushFormData();

    if (currentId == 1) {
      await collectAndPushFormData();
      console.log("Hello from mySubmitFunction on page:", currentId);

      setTimeout(function () {
        if ($(".en__field--validationFailed").length > 0) {
          console.log("Validation failed in form:", currentId);
        } else {
          setTimeout(function () {
            console.log("Validation passed in form:", currentId);

            $("#form_1").hide();
            $(".en__component .en__component--formblock").hide();
            $(".en__component .en__component--formblock").after(`
              <div class="en__component en__component--formblock active" id="form_4">
                <div class="cnfm_dtn">
                  Hold On <h4>Please wait</h4>
                </div>
              </div>`);
            $(".en__component .en__component--formblock .active").css(
              "display",
              "block",
            );
          }, 100);
        }
      }, 1000);
    }
    if (currentId == 2) {
      await collectAndPushFormData1();
      setTimeout(function () {
        if ($(".en__field--validationFailed").length > 0) {
          console.log("Validation failed in form:", currentId);
        } else {
          setTimeout(function () {
            console.log("Validation passed in form:", currentId);

            $(".en__component.en__component--contactblock").hide();
            $(".personal_text").hide();

            $(".en__component .en__component--formblock").hide();
            $(".en__component .en__component--formblock").after(`
              <div class="en__component en__component--formblock active" id="form_4">
                <div class="cnfm_dtn">
                  Hold On <h4>Please wait</h4>
                </div>
              </div>`);
            $(".en__component .en__component--formblock .active").css(
              "display",
              "block",
            );
          }, 100);
        }
      }, 500);
    }

    $("body,html").stop().animate({ scrollTop: 0 }, 600);
    return true;
  } catch (err) {
    console.log("Error at mySubmitFunction:", err);
    throw err;
  }
}

function collectAndPushFormData() {
  var formData = {};
  var form = document.querySelector(".en__component--page");
  if (form) {
    var inputFields = form.querySelectorAll("input, select, textarea");
    inputFields.forEach(function (field) {
      if (field.name) {
        if (field.name.startsWith("supporter.")) {
          var supporterFieldName = field.name.replace(
            "supporter.",
            "supporter_",
          );
          formData[supporterFieldName] = field.value;
        } else {
          formData[field.name] = field.value;
        }
      }
    });
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "en_survey",
      ENformData: formData,
    });
  } else {
    console.error("Form element not found.");
  }
}

function collectAndPushFormData1() {
  var formData = {};
  var form = document.querySelector(".en__component--page");
  if (form) {
    var inputFields = form.querySelectorAll("input, select, textarea");
    inputFields.forEach(function (field) {
      if (field.name) {
        if (field.name.startsWith("supporter.")) {
          var supporterFieldName = field.name.replace(
            "supporter.",
            "supporter_",
          );
          formData[supporterFieldName] = field.value;
        } else {
          formData[field.name] = field.value;
        }
      }
    });
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "en_form",
      ENformData: formData,
    });
  } else {
    console.error("Form element not found.");
  }
}

window.enOnValidate = function () {
  return new Promise((resolve, reject) => {
    const addressField = $("#en__field_supporter_NOT_TAGGED_42").closest(
      ".en__field",
    );
    if (addressField.hasClass("en__field--validationFailed")) {
      reject(); // stop form submission
      return;
    }
    mySubmitFunction()
      .then(() => {
        console.log("mySubmitFunction succeeded");
        resolve(); // allow EN to continue
      })
      .catch((error) => {
        console.error("mySubmitFunction failed:", error);
        reject(); // block submission
      });
  });
};

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.getElementById(
    "en__field_supporter_emailAddress",
  );
  const errorElement = document.querySelector(".en__field__error");

  if (inputField && errorElement) {
    inputField.insertAdjacentElement("afterend", errorElement);
  }
});

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//p tag to whit
$(document).ready(function () {
  $("#footer_msg p").css("color", "white");
});

/* Function to close all dropdowns */
function closeAllSelect(elmnt) {
  let x = document.getElementsByClassName("select-items");
  let y = document.getElementsByClassName("select-selected");

  for (let i = 0; i < y.length; i++) {
    if (elmnt !== y[i]) {
      y[i].classList.remove("select-arrow-active");
    }
  }

  for (let i = 0; i < x.length; i++) {
    if (!x[i].classList.contains("select-hide")) {
      x[i].classList.add("select-hide");
    }
  }
}

/* Close dropdowns when clicking outside */
document.addEventListener("click", closeAllSelect);

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

$(document).ready(function () {
  $(".en__ticket__quantity").val("1");
  $(".en__field--email-opt-in .en__field__input--checkbox").prop(
    "checked",
    true,
  );
  $(".en__field--email-opt-in").css("display", "none");
  $("#en__field_supporter_postcode").keyup(function (e) {
    console.log("Handler for .keypress() called.");
    $("#en__field_supporter_city").val("");
    $(".en__field--city").removeClass("populated");
    $(".en__field--region")
      .find(".en__field__element--select")
      .find(".select-selected")
      .text("Select State");
    var divs = $(".en__field--region")
      .find(".en__field__element--select")
      .find(".select-items")
      .find("div")
      .removeClass("same-as-selected");
    var postCode = $("#en__field_supporter_postcode").val();
    var maxLength = 5;
    postCode = postCode.substring(0, maxLength);
    $("#en__field_supporter_postcode").val(postCode);
    if (postCode.length == 5) {
      $.ajax({
        type: "GET",
        beforeSend: function (request) {
          request.setRequestHeader(
            "x-key",
            "6b0dcc1af27a260624af140faa57d34caf51ab55",
          );
        },
        url: "//zip.getziptastic.com/v3/US/" + postCode,
        success: function (data) {
          $("#en__field_supporter_city").val(data[0].city);
          $(".en__field--city").addClass("populated");

          var div = document.getElementsByClassName("select-items select-hide");
          $(".en__field--region")
            .find(".en__field__element--select")
            .find(".select-selected")
            .text(data[0].state);
          var divs = $(".en__field--region")
            .find(".en__field__element--select")
            .find(".select-items")
            .find('div:contains("' + data[0].state + '")')
            .addClass("same-as-selected");
          $(".same-as-selected").click();
          // selElmnt = document.getElementById("en__field_supporter_postcode").parentNode.parentNode.parentNode.getElementsByTagName("select")[0];

          // ll = selElmnt.length;
          // for (j = 0; j < ll; j++) {
          //  if(selElmnt.options[j].innerHTML==data[0].state){
          //      console.log(selElmnt.options[j].innerHTML);

          //      selElmnt.selectedIndex="-1";
          //      selElmnt.selectedIndex=j;

          //  }

          // }
        },
      });
    }
  });
});
