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

//********************** google places + civic API integration **********************//

function initAddressAutocomplete() {

    $(document).ready(function () {


        const addressField = "#en__field_supporter_NOT_TAGGED_2";


        $(addressField).attr("autocomplete", "nope");

        $(".en__field--country").removeClass("en__hidden");

        toggleAddressFields("hide");



        /*
        Clear address data when user changes autocomplete value
        */

        $(document).on("input", addressField, function () {

            clearAddressError();

            resetCustomDropdown(".en__field--region", "Select State");
            resetCustomDropdown(".en__field--country", "Select Country");

            toggleAddressFields("hide");

        });




        /*
        Hide / show address related fields
        */

        function toggleAddressFields(action) {


            const fields = [
                "#en__field_supporter_NOT_TAGGED_46",
                "#en__field_supporter_NOT_TAGGED_44",
                "#en__field_supporter_city",
                "#en__field_supporter_postcode",
                "#en__field_supporter_address1",
                "#en__field_supporter_address2",
                "#en__field_supporter_NOT_TAGGED_45",
                "#en__field_supporter_NOT_TAGGED_41",
                "#en__field_supporter_NOT_TAGGED_43",
                "#en__field_supporter_secondRegion"
            ];


            fields.forEach(function (selector) {


                const field = $(selector).closest(".en__field");


                if (action === "hide") {

                    field.addClass("en__field--hidden");

                } else {

                    field.removeClass("en__field--hidden");

                }


                $(selector).val("");

            });



            $(".en__field--country, .en__field--region")
                .toggleClass(
                    "en__field--hidden",
                    action === "hide"
                );

        }





        /*
        Store selected location data
        */

        const locationInfo = {

            country: {},
            state: {},
            city: "",
            postalCode: "",
            street: "",
            streetNumber: "",
            streetTwo: "",


            reset() {

                this.country = {};
                this.state = {};
                this.city = "";
                this.postalCode = "";
                this.street = "";
                this.streetNumber = "";
                this.streetTwo = "";

            }

        };






        /*
        Google autocomplete
        */

        const autocomplete = new google.maps.places.Autocomplete(

            document.getElementById(
                "en__field_supporter_NOT_TAGGED_42"
            ),

            {
                types: ["geocode"],
                componentRestrictions: {
                    country: "UK"
                }
            }

        );



        autocomplete.setFields([
            "address_component"
        ]);





        google.maps.event.addListener(
            autocomplete,
            "place_changed",
            function () {


                const place = autocomplete.getPlace();


                if (!place.address_components) {
                    return;
                }


                locationInfo.reset();


                const components =
                    place.address_components;



                const hasStreet =
                    components.some(item =>
                        item.types.includes("route")
                    );


                const hasPostcode =
                    components.some(item =>
                        item.types.includes("postal_code")
                    );



                if (!hasStreet && !hasPostcode) {

                    alert(
                        "Please select a valid address from the drop down."
                    );

                    $(addressField).val("");

                    return;
                }



                clearAddressError();



                components.forEach(function(component){

                    updateAddressField(component);

                });



                if (!locationInfo.postalCode) {

                    $("#en__field_supporter_postcode")
                        .val("00000");

                }



                getCivicInformation();


            }
        );






        /*
        Map Google components
        */

        function updateAddressField(component) {


            const type = component.types[0];


            switch(type) {



                case "country":

                    locationInfo.country = {
                        label: component.long_name,
                        value: component.short_name
                    };


                    updateCountry(component);

                    break;




                case "administrative_area_level_1":

                    locationInfo.state = {
                        label: component.long_name,
                        value: component.short_name
                    };


                    updateState(component);

                    break;




                case "administrative_area_level_2":

                    $("#en__field_supporter_secondRegion")
                        .val(component.long_name)
                        .closest(".en__field")
                        .addClass("en__field--hidden");

                    break;




                case "locality":
                case "postal_town":

                    locationInfo.city =
                        component.long_name;


                    $("#en__field_supporter_city")
                        .val(component.long_name)
                        .closest(".en__field")
                        .addClass("en__field--hidden");

                    break;




                case "postal_code":

                    locationInfo.postalCode =
                        component.long_name;


                    $("#en__field_supporter_postcode")
                        .val(component.long_name);

                    break;




                case "route":

                    locationInfo.street =
                        component.long_name;


                    $("#en__field_supporter_address1")
                        .val(component.long_name)
                        .closest(".en__field")
                        .addClass("en__field--hidden");

                    break;




                case "subpremise":

                    $("#en__field_supporter_address2")
                        .val(component.long_name)
                        .closest(".en__field")
                        .addClass("en__field--hidden");

                    break;




                case "street_number":

                    locationInfo.streetNumber =
                        component.long_name;


                    $("#en__field_supporter_address1")
                        .val(
                            component.long_name + " " +
                            $("#en__field_supporter_address1").val()
                        );

                    break;


            }

        }
