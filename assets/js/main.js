function isDateValid(day, month, year) {
    const date = new Date(year, month - 1, day);
    return date && date.getDate() === parseInt(day);
}

function isMonthValid(month) {
    return month >= 1 && month <= 12;
}

function calculateAge(day, month, year) {
    const birthdate = new Date(year, month - 1, day); // Create a date object from the input
    const today = new Date();

    let ageYears = today.getFullYear() - birthdate.getFullYear();
    let ageMonths = today.getMonth() - birthdate.getMonth();
    let ageDays = today.getDate() - birthdate.getDate();

    if (ageDays < 0) { // If the day of the birthdate is greater than the day of today, subtract one month from the age in months
      ageMonths--;
      ageDays += new Date(year, month, 0).getDate(); // Get the number of days in the previous month
    }

    if (ageMonths < 0) { // If the month of the birthdate is greater than the month of today, subtract one year from the age in years
      ageYears--;
      ageMonths += 12;
    }

    return { years: ageYears, months: ageMonths, days: ageDays };
}

$(".input_content").submit((e) => {
    e.preventDefault();

    // Assign the input elements to variables
    const dateInput = $("#days");
    const monthInput = $("#months");
    const yearInput = $("#years");

    // Assign the error message elements to variables
    const dateError = $("#days-error");
    const monthError = $("#months-error");
    const yearError = $("#years-error");

    // Assign the output elements to variables
    const dateOutput = $(".days_output .output_data");
    const monthOutput = $(".months_output .output_data");
    const yearOutput = $(".years_output .output_data");

    let allInputsValid = true;

    [dateInput, monthInput, yearInput].forEach((element) => {
        if (element.val() === "") {
            // Target the error message element of the current input element
            element.css("borderColor", "red");
            element.next(".error-message").text("This field is required.");
            element.prev("label").css("color", "red");
            allInputsValid = false;
        } else {
            element.css("borderColor", "#E5E5E5");
            element.next(".error-message").text("");
            element.prev("label").css("color", "#323232");
        }
    });


    if (allInputsValid) {
        if (dateInput.val() && !isDateValid(dateInput.val(), monthInput.val(), yearInput.val())) {
            dateError.text("Must be a valid date");
            dateInput.css("borderColor", "red");
            dateInput.prev("label").css("color", "red");
            allInputsValid = false;
        }

        if (monthInput.val() && !isMonthValid(monthInput.val())) {
            monthError.text("Must be a valid month");
            monthInput.css("borderColor", "red");
            monthInput.prev("label").css("color", "red");
            allInputsValid = false;
        }

        if (yearInput.val() && yearInput.val() > new Date().getFullYear()) {
            yearError.text("Must be in the past");
            yearInput.css("borderColor", "red");
            yearInput.prev("label").css("color", "red");
            allInputsValid = false;
        }
    }

    if (!dateError.text() && !monthError.text() && !yearError.text()) {
        const age = calculateAge(dateInput.val(), monthInput.val(), yearInput.val()); // Calculate the age and return it as an object with the properties years, months and days
        yearOutput.animateNumber({ number: age.years }, 1500);
        monthOutput.animateNumber({ number: age.months }, 1500);
        dateOutput.animateNumber({ number: age.days }, 1500);
    }
});

