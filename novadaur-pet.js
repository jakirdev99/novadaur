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
async function initAddressAutocomplete() {

    const addressField = document.getElementById(
        "en__field_supporter_NOT_TAGGED_2"
    );

    if (!addressField) {
        return;
    }

    const { PlaceAutocompleteElement } =
        await google.maps.importLibrary("places");


    const autocomplete = new PlaceAutocompleteElement({
        includedRegionCodes: ["us"],
        includedPrimaryTypes: ["street_address"]
    });


    autocomplete.id = "google-address-autocomplete";


    /*
     * Put Google autocomplete in the existing EN address field
     */
    addressField.parentNode.insertBefore(
        autocomplete,
        addressField
    );


    /*
     * Hide the original EN input
     */
    addressField.style.display = "none";


    /*
     * User selects an address
     */
    autocomplete.addEventListener(
        "gmp-select",
        async function (event) {

            const place =
                event.placePrediction.toPlace();


            await place.fetchFields({
                fields: [
                    "addressComponents",
                    "formattedAddress"
                ]
            });


            fillAddressFields(
                place.addressComponents
            );

        }
    );
}


function fillAddressFields(components) {

    let address1 = "";
    let city = "";
    let state = "";
    let stateCode = "";
    let postcode = "";
    let country = "";
    let countryCode = "";


    components.forEach(function (component) {

        const type = component.types[0];


        switch (type) {

            case "street_number":
                address1 = component.longText + " ";
                break;


            case "route":
                address1 += component.longText;
                break;


            case "locality":
            case "postal_town":
                city = component.longText;
                break;


            case "administrative_area_level_1":
                state = component.longText;
                stateCode = component.shortText;
                break;


            case "postal_code":
                postcode = component.longText;
                break;


            case "country":
                country = component.longText;
                countryCode = component.shortText;
                break;

        }

    });


    setField(
        "#en__field_supporter_address1",
        address1.trim()
    );


    setField(
        "#en__field_supporter_city",
        city
    );


    setField(
        "#en__field_supporter_postcode",
        postcode
    );


    setSelect(
        "#en__field_supporter_region",
        state,
        stateCode
    );


    setSelect(
        "#en__field_supporter_country",
        country,
        countryCode
    );
}

function setField(selector, value) {

    $(selector)
        .val(value)
        .trigger("input")
        .trigger("change");

}


function setSelect(selector, label, value) {

    const select = $(selector);

    if (!select.length) {
        return;
    }


    const option = select.find("option").filter(function () {

        return (
            this.value === value ||
            this.value === label ||
            $(this).text().trim() === label
        );

    }).first();


    if (option.length) {

        select
            .val(option.val())
            .trigger("change");

    }


    /*
     * Update your existing custom dropdown
     */
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
