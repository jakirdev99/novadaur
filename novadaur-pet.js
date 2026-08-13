$(document).ready(function () {
  const checkbox = document.getElementById("popup");
  const formBlock = document.querySelector(
    ".en__component.en__component.en__component--column.en__component--column--2",
  );

  function toggleFormBlock() {
    if (window.innerWidth < 993) {
      // only apply below 993px
      if (checkbox.checked) {
        formBlock.style.display = "block";
      } else {
        formBlock.style.display = "none";
      }
    } else {
      // Optional: reset when screen is larger
      formBlock.style.display = "";
    }
  }

  // Initial logs
  console.log("Initially checked:", checkbox.checked);
  console.log("Value attribute:", checkbox.value);

  // URL logic
  var pathArray = window.location.pathname.split("/").filter(Boolean);
  var currentId = Number(pathArray[pathArray.length - 1]); // convert to number

  if (currentId > 1) {
    checkbox.checked = true;
    console.log("Checkbox is now checked because currentId > 1");
  }

  // Run once on load
  toggleFormBlock();

  // Listen for checkbox toggle
  checkbox.addEventListener("change", toggleFormBlock);

  // Also handle screen resize
  window.addEventListener("resize", toggleFormBlock);
});

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::keyup scripts::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// :::::: Keyup function to remove error msg when enter Values :::::: //

$(document).ready(function () {
  //  ::::::Block to remove hold:::::::: //

  window.addEventListener("pageshow", function (event) {
    var pathArray = window.location.pathname.split("/").filter(Boolean);
    console.log("Patharray_3:", pathArray);
    var currentId = pathArray[pathArray.length - 1];
    console.log("CurrentId in backbtn", currentId);

    if (currentId == "1" || currentId == "2" || currentId == "3") {
      $("#form_4").remove();
      $(".en__component.en__component--formblock").show();
      //   $(".en__component.en__component--formblock").css("display", "block");
      console.log(`Current Page is ${currentId} :::::::::;::::::`);
    }
  });

  // First Name

  $("#en__field_supporter_firstName").on("keyup", function () {
    var value = $(this).val().trim();

    if (value !== "") {
      // Hide the error message
      $(".en__field--firstName .en__field__error").hide();

      // Remove the validation error class
      $(".en__field--firstName ").removeClass("en__field--validationFailed");

      console.log("First Name field has data. Validation error removed.");
    }
  });

  // Last Name
  $("#en__field_supporter_lastName").on("keyup", function () {
    var value = $(this).val().trim();

    if (value !== "") {
      // Hide the error message
      $(".en__field--lastName .en__field__error").hide();

      // Remove the validation error class
      $(".en__field--lastName").removeClass("en__field--validationFailed");

      console.log("Last Name field has data. Validation error removed.");
    }
  });

  // Address
  $("#en__field_supporter_NOT_TAGGED_42").on("keyup", function () {
    var value = $(this).val().trim();

    if (value !== "") {
      // Hide the error message
      $(".en__field--NOT_TAGGED_42 .en__field__error").hide();

      // Remove the validation error class
      $(".en__field--NOT_TAGGED_42").removeClass("en__field--validationFailed");

      console.log("Address field has data. Validation error removed.");
    }
  });

  // Phone Number
  $("#en__field_supporter_phoneNumber2").on("keyup", function () {
    var value = $(this).val().trim();

    if (value !== "") {
      // Hide the error message
      $(".en__field--phoneNumber2 .en__field__error").hide();

      // Remove the validation error class
      $(".en__field--phoneNumber2").removeClass("en__field--validationFailed");

      console.log("Phone Number field has data. Validation error removed.");
    }
  });

  // email address
  $("#en__field_supporter_emailAddress").on("keyup", function () {
    var value = $(this).val().trim();

    if (value !== "") {
      // Hide the error message
      $(".en__field--emailAddress .en__field__error").hide();

      // Remove the validation error class
      $(".en__field--emailAddress").removeClass("en__field--validationFailed");

      console.log("Email Address field has data. Validation error removed.");
    }
  });

  // dropdown1
  function clearError1() {
    var value = $("#en__field_supporter_questions_2103481").val();

    if (value === "0" || value === "1") {
      var $field = $("#en__field_supporter_questions_2103481").closest(
        ".en__field",
      );

      $field.find(".en__field__error").remove();

      $field.removeClass("en__field--validationFailed");
    }
  }

  $("#en__field_supporter_questions_2103481").on("change", clearError1);

  $(".en__field--2103481").on(
    "click",
    ".select-items div, .select-selected",
    function () {
      setTimeout(clearError1, 10);
    },
  );

  // dropdown2
  function clearError2() {
    var value = $("#en__field_supporter_questions_2103495").val();

    if (value === "0" || value === "1") {
      var $field = $("#en__field_supporter_questions_2103495").closest(
        ".en__field",
      );

      $field.find(".en__field__error").remove();

      $field.removeClass("en__field--validationFailed");
    }
  }

  $("#en__field_supporter_questions_2103495").on("change", clearError2);

  $(".en__field--2103495").on(
    "click",
    ".select-items div, .select-selected",
    function () {
      setTimeout(clearError2, 10);
    },
  );

  // dropdown3
  function clearError3() {
    var value = $("#en__field_supporter_questions_2103496").val();

    if (value === "0" || value === "1") {
      var $field = $("#en__field_supporter_questions_2103496").closest(
        ".en__field",
      );

      $field.find(".en__field__error").remove();

      $field.removeClass("en__field--validationFailed");
    }
  }

  $("#en__field_supporter_questions_2103496").on("change", clearError3);

  $(".en__field--2103496").on(
    "click",
    ".select-items div, .select-selected",
    function () {
      setTimeout(clearError3, 10);
    },
  );
});

//   :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

$(document).ready(function () {
  initCustomDropdowns();
  initializeFloatLabels();
  initAddressAutocomplete();
});

function initCustomDropdowns() {
  var selects = document.getElementsByClassName("en__field__element--select");

  for (let i = 0; i < selects.length; i++) {
    let selElmnt = selects[i].getElementsByTagName("select")[0];

    // Skip region select field
    if (!selElmnt || selElmnt.id === "en__field_supporter_region") continue;

    // Create selected div
    let selectedDiv = document.createElement("DIV");
    selectedDiv.setAttribute("class", "select-selected");
    selectedDiv.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    selects[i].appendChild(selectedDiv);

    // Create custom options container
    let optionDiv = document.createElement("DIV");
    optionDiv.setAttribute("class", "select-items select-hide");

    for (let j = 0; j < selElmnt.length; j++) {
      let optionItem = document.createElement("DIV");
      optionItem.innerHTML = selElmnt.options[j].innerHTML;
      optionItem.dataset.value = selElmnt.options[j].value;

      optionItem.addEventListener("click", function () {
        selElmnt.selectedIndex = j; // update real select
        selElmnt.dispatchEvent(new Event("change", { bubbles: true })); // notify EN conditional logic
        selectedDiv.innerHTML = this.innerHTML; // update visible text

        // After EN conditional logic has had time to run, re-sync all custom dropdown
        // texts with their native select values. EN's setFieldValue() sets select.value
        // directly without firing a change event, so the visible text won't update otherwise.
        setTimeout(function () {
          var allSelectFields = document.getElementsByClassName(
            "en__field__element--select",
          );
          for (var s = 0; s < allSelectFields.length; s++) {
            var nativeSel =
              allSelectFields[s].getElementsByTagName("select")[0];
            var customDiv =
              allSelectFields[s].querySelector(".select-selected");
            if (nativeSel && customDiv) {
              customDiv.innerHTML =
                nativeSel.options[nativeSel.selectedIndex].innerHTML;
            }
          }
        }, 50);

        // Close dropdown
        let openItems = document.getElementsByClassName("select-items");
        for (let k = 0; k < openItems.length; k++) {
          openItems[k].classList.add("select-hide");
        }
      });

      optionDiv.appendChild(optionItem);
    }

    selects[i].appendChild(optionDiv);

    // Sync custom UI when native select is changed programmatically (e.g. EN conditional logic)
    selElmnt.addEventListener("change", function () {
      selectedDiv.innerHTML =
        selElmnt.options[selElmnt.selectedIndex].innerHTML;
    });

    // Open/close dropdown
    selectedDiv.addEventListener("click", function (e) {
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }

  // Close all dropdowns except current
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

  // Close when clicking outside
  document.addEventListener("click", closeAllSelect);
}

function initializeFloatLabels() {
  $("select#en__field_supporter_country").prop("disabled", false);

  // $('.en__field__input--email').attr(
  //     "pattern",
  //     "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{1,63}$"
  // );

  (function ($) {
    $.fn.FloatLabel = function (options) {
      var defaults = {
        populatedClass: "populated",
        focusedClass: "focused",
      };
      var settings = $.extend({}, defaults, options);

      return this.each(function () {
        var element = $(this),
          label = element.find("label"),
          input = element.find("textarea, input");

        if (input.val()) {
          element.addClass(settings.populatedClass);
        }

        input.on("focus", function () {
          element.addClass(settings.focusedClass);
          if (input.val() === label.text()) {
            input.val("");
          } else {
            element.addClass(settings.populatedClass);
          }
        });

        input.on("blur", function () {
          element.removeClass(settings.focusedClass);
          if (!input.val()) {
            element.removeClass(settings.populatedClass);
          }
        });

        input.on("keyup", function () {
          element.addClass(settings.populatedClass);
        });
      });
    };
  })(jQuery);

  $(
    ".en__field--text, .en__field--number, .en__field--emailAddress, .en__field--telephone",
  ).FloatLabel();
}

function initAddressAutocomplete() {
  $(document).ready(function () {
    $("#en__field_supporter_NOT_TAGGED_42").attr("autocomplete", "nope");
    $(".en__field--country").removeClass("en__hidden");
    MakeVisibleFields("hide");

    // Keyup / input handler
    $(document).on("input", "#en__field_supporter_NOT_TAGGED_42", function () {
      $(".en__field--NOT_TAGGED_42 .en__field__error").remove();
      $(".en__field--NOT_TAGGED_42").removeClass("en__field--validationFailed");

      $(".en__field--region")
        .find(".en__field__element--select .select-items div")
        .removeClass("same-as-selected");
      $(".en__field--region")
        .find(".en__field__element--select .select-selected")
        .text("Select State");
      $(".en__field--country")
        .find(".en__field__element--select .select-items div")
        .removeClass("same-as-selected");
      $(".en__field--country")
        .find(".en__field__element--select .select-selected")
        .text("Select Country");

      MakeVisibleFields("hide");
    });

    function MakeVisibleFields(swapFlag) {
      const fieldsToToggle = [
        "#en__field_supporter_NOT_TAGGED_46",
        "#en__field_supporter_NOT_TAGGED_44",
        "#en__field_supporter_city",
        "#en__field_supporter_postcode",
        "#en__field_supporter_address1",
        "#en__field_supporter_address2",
        "#en__field_supporter_NOT_TAGGED_45",
        "#en__field_supporter_NOT_TAGGED_41",
        "#en__field_supporter_NOT_TAGGED_43",
        "#en__field_supporter_secondRegion",
      ];

      fieldsToToggle.forEach((selector) => {
        const field = $(selector).closest(".en__field");
        if (swapFlag === "hide") field.addClass("en__field--hidden");
        else if (swapFlag === "show") field.removeClass("en__field--hidden");
        $(selector).val("");
      });

      if (swapFlag === "hide") {
        $(".en__field--country, .en__field--region").addClass(
          "en__field--hidden",
        );
      } else {
        $(".en__field--country, .en__field--region").removeClass(
          "en__field--hidden",
        );
      }
    }

    // Location info object
    const locationInfo = {
      geo: null,
      country: { value: null, label: null },
      state: { value: null, label: null },
      city: null,
      postalCode: null,
      street: null,
      streetNumber: null,
      streettwo: null,
      reset: function () {
        this.geo = null;
        this.country = { value: null, label: null };
        this.state = { value: null, label: null };
        this.city = null;
        this.postalCode = null;
        this.street = null;
        this.streetNumber = null;
        this.streettwo = null;
      },
    };

    // Google Autocomplete
    const googleAutocomplete = {
      autocompleteField: function (fieldId) {
        const autocomplete = new google.maps.places.Autocomplete(
          document.getElementById(fieldId),
          {
            types: ["geocode"],
            componentRestrictions: { country: "UK" },
          },
        );
        autocomplete.setFields(["address_component"]);

        google.maps.event.addListener(
          autocomplete,
          "place_changed",
          function () {
            const place = autocomplete.getPlace();
            locationInfo.reset();
            const address = place.address_components;

            console.log("ADDRESS", address);

            // Validate essential components
            let hasStreet = false,
              hasPostalCode = false;
            address.forEach((comp) => {
              if (comp.types.includes("route")) hasStreet = true;
              if (comp.types.includes("postal_code")) hasPostalCode = true;
            });
            if (!hasStreet && !hasPostalCode) {
              alert("Please select a valid address from the drop down.");
              document.getElementById(fieldId).value = "";
              return;
            }

            // Clear errors
            $(".en__field--NOT_TAGGED_42 .en__field__error").remove();
            $(".en__field--NOT_TAGGED_42").removeClass(
              "en__field--validationFailed",
            );

            // Map address components to fields
            address.forEach((component) => {
              const type = component.types[0];
              switch (type) {
                case "country":
                  locationInfo.country.label = component.long_name;
                  locationInfo.country.value = component.short_name;
                  var countryCode = locationInfo.country.value;

                  // Show postcode field for non-UK countries
                  if (countryCode !== "GB") {
                    console.log("HHAH", countryCode);
                    $("#en__field_supporter_postcode")
                      .closest(".en__field")
                      .removeClass("en__field--hidden");
                  }

                  console.log("AD", locationInfo.country.value);

                  // Update visible dropdown
                  $(".en__field--country .select-selected").text(
                    component.long_name,
                  );

                  $(
                    '.en__field--country .select-items div:contains("' +
                      component.long_name +
                      '")',
                  )
                    .addClass("same-as-selected")
                    .click();

                  if ($("#en__field_supporter_country").length) {
                    $("#en__field_supporter_country")
                      .val(component.short_name)
                      .trigger("change");
                  }

                  $(".en__field--country").addClass("en__field--hidden");
                  break;
                // case "administrative_area_level_1":
                //     locationInfo.state.label = component.long_name;
                //     locationInfo.state.value = component.short_name;
                //     $('.en__field--region .select-selected').text(component.long_name);
                //     $('.en__field--region .select-items div:contains("'+component.long_name+'")').addClass('same-as-selected').click();
                //     $(".en__field--region").addClass("en__field--hidden");
                //     break;

                case "administrative_area_level_1":
                  locationInfo.state.label = component.long_name;
                  locationInfo.state.value = component.short_name;
                  console.log("STATE", locationInfo.state.value);

                  // Update custom-styled dropdown text (if using custom select UI)
                  $(".en__field--region .select-selected").text(
                    component.long_name,
                  );
                  $(
                    '.en__field--region .select-items div:contains("' +
                      component.long_name +
                      '")',
                  )
                    .addClass("same-as-selected")
                    .click();

                  // Set the actual <select> field value directly
                  $("#en__field_supporter_region")
                    .val(component.long_name)
                    .trigger("change");

                  // Optionally hide this field if needed
                  $(".en__field--region").addClass("en__field--hidden");

                  break;

                case "administrative_area_level_2":
                  //locationInfo.city = component.long_name;
                  $("#en__field_supporter_secondRegion")
                    .val(component.long_name)
                    .closest(".en__field")
                    .addClass("en__field--hidden");
                  break;

                case "locality":
                  locationInfo.city = component.long_name;
                  $("#en__field_supporter_city")
                    .val(component.long_name)
                    .closest(".en__field")
                    .addClass("en__field--hidden");
                  break;
                case "postal_town":
                  locationInfo.city = component.long_name;
                  $("#en__field_supporter_city")
                    .val(component.long_name)
                    .closest(".en__field")
                    .addClass("en__field--hidden");
                  break;
                case "postal_code":
                  locationInfo.postalCode = component.long_name;
                  console.log("POOS11", locationInfo.postalCode);
                  $("#en__field_supporter_postcode").val(component.long_name);
                  break;
                case "route":
                  locationInfo.street = component.long_name;
                  let streetValue = $("#en__field_supporter_address1").val();
                  $("#en__field_supporter_address1")
                    .val(streetValue + " " + component.long_name)
                    .closest(".en__field")
                    .addClass("en__field--hidden");
                  break;
                case "subpremise":
                  locationInfo.streettwo = component.long_name;
                  $("#en__field_supporter_address2")
                    .val(component.long_name)
                    .closest(".en__field")
                    .addClass("en__field--hidden");
                  break;
                case "street_number":
                  locationInfo.streetNumber = component.long_name;
                  let streetNum = $("#en__field_supporter_address1").val();
                  $("#en__field_supporter_address1").val(
                    component.long_name + " " + streetNum,
                  );
                  break;
                default:
                  break;
              }
            });
            console.log("POOS", locationInfo.postalCode);

            // if (!locationInfo.postalCode) {
            //     $("#en__field_supporter_postcode").closest(".en__field").removeClass("en__field--hidden");
            // }

            // Set default postcode for non-US
            // if(locationInfo.postalCode.value != "US") {
            //     $("#en__field_supporter_postcode").val("00000");
            // }

            if (!locationInfo.postalCode) {
              $("#en__field_supporter_postcode").val("00000");
            }

            // Civic API call
            const address_string = $(
              "#en__field_supporter_NOT_TAGGED_42",
            ).val();
            const civicFields = {
              "/place": "#en__field_supporter_NOT_TAGGED_54",
              "/sldu": "#en__field_supporter_NOT_TAGGED_52",
              "/cd": "#en__field_supporter_NOT_TAGGED_51",
              "/sldl": "#en__field_supporter_NOT_TAGGED_53",
            };
            $.ajax({
              url: "https://www.googleapis.com/civicinfo/v2/divisionsByAddress",
              method: "GET",
              data: {
                address: address_string,
                alt: "json",
                includeOffices: false,
                key: "AIzaSyB1iSGfBn28MUaqCQ3VhJ9Rrhc81aT_1yQ",
              },
              success: function (response) {
                const divisions = response.divisions;
                Object.keys(civicFields).forEach(function (key) {
                  Object.keys(divisions).forEach(function (divkey) {
                    if (divkey.indexOf(key) != -1) {
                      $(civicFields[key])
                        .val(divisions[divkey].name)
                        .closest(".en__field")
                        .addClass("en__field--hidden");
                    }
                  });
                });
                Object.keys(divisions).forEach(function (divkey) {
                  if (
                    divkey.indexOf("/county") != -1 &&
                    divkey.indexOf("council_district") == -1
                  ) {
                    $("#en__field_supporter_NOT_TAGGED_49")
                      .val(divisions[divkey].name)
                      .closest(".en__field")
                      .addClass("en__field--hidden");
                  }
                });
              },
            });
          },
        );
      },
    };

    googleAutocomplete.autocompleteField("en__field_supporter_NOT_TAGGED_42");

    setTimeout(function () {
      $("#en__field_supporter_NOT_TAGGED_42").attr("autocomplete", "nope");
    }, 1000);

    // Focus out validation
    $("#en__field_supporter_NOT_TAGGED_42").focusout(function () {
      setTimeout(function () {
        const fieldVal = $("#en__field_supporter_NOT_TAGGED_42").val();
        if (fieldVal == "") {
          MakeVisibleFields("hide");
        } else {
          const street = $("#en__field_supporter_address1").val();
          const postcode = $("#en__field_supporter_postcode").val();
          if (street == "" || postcode == "") {
            $(".en__field--NOT_TAGGED_42").removeClass(
              "en__field--validationFailed",
            );
            if (
              !$(".en__field--NOT_TAGGED_42").hasClass(
                "en__field--validationFailed",
              )
            ) {
              $(".en__field--NOT_TAGGED_42")
                .append(
                  '<div class="en__field__error">Please select a valid drop down address</div>',
                )
                .addClass("en__field--validationFailed");
            }
          }
        }
      }, 800);
    });
  });
}

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
          formValidator();
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
          formValidator();
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
