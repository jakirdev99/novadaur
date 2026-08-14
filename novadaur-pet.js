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
    "#en__field_supporter_NOT_TAGGED_2",
    ".en__field--NOT_TAGGED_2"
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

//********************** google address autocomplete **********************//
function initAddressAutocomplete() {

    const addressInput = document.getElementById(
        "en__field_supporter_NOT_TAGGED_2"
    );

    if (!addressInput) {
        return;
    }

    const autocomplete = new google.maps.places.Autocomplete(
        addressInput,
        {
            types: ["address"],
            componentRestrictions: {
                country: "us"
            },
            fields: ["address_components"]
        }
    );

    autocomplete.addListener("place_changed", function () {

        const place = autocomplete.getPlace();

        if (!place.address_components) {
            return;
        }

        fillAddressFields(place.address_components);
    });
}


/* ============================================================
   FILL ADDRESS FIELDS
   ============================================================ */

function fillAddressFields(components) {

    let address1 = "";
    let city = "";
    let state = "";
    let stateCode = "";
    let zipCode = "";
    let country = "";
    let countryCode = "";

    components.forEach(function (component) {

        const types = component.types;

        if (types.includes("street_number")) {
            address1 = component.long_name + " ";
        }

        if (types.includes("route")) {
            address1 += component.long_name;
        }

        if (types.includes("locality")) {
            city = component.long_name;
        }

        if (types.includes("administrative_area_level_1")) {
            state = component.long_name;
            stateCode = component.short_name;
        }

        if (types.includes("postal_code")) {
            zipCode = component.long_name;
        }

        if (types.includes("country")) {
            country = component.long_name;
            countryCode = component.short_name;
        }
    });


    /* Address 1 */
    setInputValue(
        "#en__field_supporter_address1",
        address1.trim()
    );


    /* City */
    setInputValue(
        "#en__field_supporter_city",
        city
    );


    /* State */
    setSelectValue(
        "#en__field_supporter_region",
        state,
        stateCode
    );


    /* ZIP Code */
    setInputValue(
        "#en__field_supporter_postcode",
        zipCode
    );


    /* Country */
    setSelectValue(
        "#en__field_supporter_country",
        country,
        countryCode
    );
}


/* ============================================================
   INPUT FIELD HELPER
   ============================================================ */

function setInputValue(selector, value) {

    $(selector)
        .val(value)
        .trigger("input")
        .trigger("change");
}


/* ============================================================
   SELECT FIELD HELPER
   ============================================================ */

function setSelectValue(selector, label, value) {

    const select = $(selector);

    if (!select.length) {
        return;
    }

    let matched = false;

    /* Try option value first */
    select.find("option").each(function () {

        if (
            this.value === value ||
            this.value === label ||
            $(this).text().trim() === label
        ) {
            select.val(this.value);
            matched = true;
            return false;
        }
    });


    if (matched) {
        select.trigger("change");
    }


    /* Update your custom dropdown UI */
    const field = select.closest(".en__field");

    field
        .find(".select-selected")
        .text(label);

    field
        .find(".select-items div")
        .removeClass("same-as-selected");

    field
        .find(".select-items div")
        .filter(function () {
            return $(this).text().trim() === label;
        })
        .first()
        .addClass("same-as-selected");
}

