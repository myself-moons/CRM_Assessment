/*
---------------------------------------------------------
Create Ticket Page

Responsibilities

- Validate the form
- Submit ticket
- Show loading state
- Show success or error message
- Redirect to dashboard
---------------------------------------------------------
*/

const form = document.getElementById("ticketForm");
const submitButton = document.getElementById("submitButton");
const messageBox = document.getElementById("message");

/**
 * Display feedback to the user.
 */
function showMessage(text, type) {

    messageBox.textContent = text;

    messageBox.className = `message ${type}`;

}

/**
 * Basic form validation.
 */
function validateForm(data) {

    if (!data.customerName.trim())
        return "Customer name is required.";

    if (data.customerName.length < 2)
        return "Customer name must be at least 2 characters.";

    if (data.customerName.length > 100)
        return "Customer name must not exceed 100 characters.";

    if (!data.customerEmail.trim())
        return "Customer email is required.";

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.customerEmail))
        return "Please enter a valid email address.";

    if (!data.subject.trim())
        return "Subject is required.";

    if (data.subject.length < 5)
        return "Subject must be at least 5 characters.";

    if (data.subject.length > 100)
        return "Subject must not exceed 100 characters.";

    if (!data.description.trim())
        return "Description is required.";

    if (data.description.length < 10)
        return "Description must be at least 10 characters.";

    if (data.description.length > 1000)
        return "Description must not exceed 1000 characters.";

    return null;

}

/**
 * Submit the form.
 */
form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const ticket = {

        customerName:
            document.getElementById("customerName").value,

        customerEmail:
            document.getElementById("customerEmail").value,

        subject:
            document.getElementById("subject").value,

        description:
            document.getElementById("description").value

    };
    const validationError =
        validateForm(ticket);

    if (validationError) {

        showMessage(validationError, "error");

        return;

    }

    submitButton.disabled = true;
    submitButton.textContent = "Creating...";

    try {

        await createTicket(ticket);

        showMessage(
            "Ticket created successfully!",
            "success"
        );

        setTimeout(function () {

            window.location.href = "index.html";

        }, 1500);

    }

    catch (error) {

        showMessage(
            error.message,
            "error"
        );

    }

    finally {

        submitButton.disabled = false;

        submitButton.textContent =
            "Submit Ticket";

    }

});