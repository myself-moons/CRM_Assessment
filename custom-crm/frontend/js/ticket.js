/*
---------------------------------------------------------
Ticket Details Page

Responsibilities

- Read ticket ID from URL
- Load ticket details
- Populate the page
- Update ticket
- Add internal notes
---------------------------------------------------------
*/

let ticketId = null;
let currentTicket = null;

const infoContainer =
    document.getElementById("ticketInformation");

const notesContainer =
    document.getElementById("notesTimeline");

const updateMessage =
    document.getElementById("updateMessage");

const saveButton =
    document.getElementById("saveButton");

const noteButton =
    document.getElementById("noteButton");

function getTicketIdFromUrl() {

    const params =
        new URLSearchParams(window.location.search);

    return params.get("ticketId");

}

async function loadTicket() {

    try {

        ticketId = getTicketIdFromUrl();

        if (!ticketId) {

            infoContainer.innerHTML =
                "<p>Ticket ID not found.</p>";

            return;

        }

        currentTicket =
            await getTicket(ticketId);

        renderTicket();

        populateForm();

        renderNotes();

    }

    catch (error) {

        infoContainer.innerHTML =
            `<p>${error.message}</p>`;

    }

}

function renderTicket() {

    infoContainer.innerHTML = `

<div class="info-grid">

<div class="info-item">

<div class="info-label">
Ticket ID
</div>

<div class="info-value">
${currentTicket.ticketId}
</div>

</div>

<div class="info-item">

<div class="info-label">
Customer
</div>

<div class="info-value">
${currentTicket.customerName}
</div>

</div>

<div class="info-item">

<div class="info-label">
Email
</div>

<div class="info-value">
${currentTicket.customerEmail}
</div>

</div>

<div class="info-item">

<div class="info-label">
Subject
</div>

<div class="info-value">
${currentTicket.subject}
</div>

</div>

<div class="info-item">

<div class="info-label">
Status
</div>

<div class="info-value">

<span class="${getStatusClass(currentTicket.status)} status">

${currentTicket.status}

</span>

</div>

</div>

<div class="info-item">

<div class="info-label">
Created
</div>

<div class="info-value">

${formatDate(currentTicket.createdAt)}

</div>

</div>

<div class="info-item">

<div class="info-label">
Updated
</div>

<div class="info-value">

${formatDate(currentTicket.updatedAt)}

</div>

</div>

</div>

<br>

<div class="info-label">

Description

</div>

<div>

${currentTicket.description}

</div>

`;

}

function getStatusClass(status) {

    switch (status) {

        case "Open":
            return "status-open";

        case "In Progress":
            return "status-progress";

        case "Closed":
            return "status-closed";

        default:
            return "status-open";

    }

}

function populateForm() {

    document.getElementById("status").value =
        currentTicket.status;

    document.getElementById("customerName").value =
        currentTicket.customerName;

    document.getElementById("customerEmail").value =
        currentTicket.customerEmail;

    document.getElementById("subject").value =
        currentTicket.subject;

    document.getElementById("description").value =
        currentTicket.description;

}

/**
 * Display all internal notes.
 */
function renderNotes() {

    const notes = currentTicket.notes || [];

    if (notes.length === 0) {

        notesContainer.innerHTML =
            "<p>No notes available.</p>";

        return;

    }

    // Newest note first.
    const newestNotes = [...notes].reverse();

    notesContainer.innerHTML = "";

    newestNotes.forEach(note => {

        notesContainer.innerHTML += `

<div class="note">

    <div>

        ${note.noteText}

    </div>

    <div class="note-time">

        ${formatDate(note.createdAt)}

    </div>

</div>

`;

    });

}

/**
 * Display a success or error message.
 */
function showMessage(text, type) {

    updateMessage.textContent = text;

    updateMessage.className =
        `message ${type}`;

}

/**
 * Update ticket information.
 */
document
    .getElementById("updateForm")
    .addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            saveButton.disabled = true;

            saveButton.textContent =
                "Saving...";

            const updates = {};
            const status = document.getElementById("status").value;
            const customerName = document.getElementById("customerName").value.trim();
            const customerEmail = document.getElementById("customerEmail").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const description = document.getElementById("description").value.trim();

            if (status !== currentTicket.status) {
                updates.status = status;
            }

            if (customerName !== currentTicket.customerName) {
                updates.customerName = customerName;
            }

            if (customerEmail !== currentTicket.customerEmail) {
                updates.customerEmail = customerEmail;
            }

            if (subject !== currentTicket.subject) {
                updates.subject = subject;
            }

            if (description !== currentTicket.description) {
                updates.description = description;
            }

            if (Object.keys(updates).length === 0) {
                showMessage("No changes were made.", "error");
                saveButton.disabled = false;
                saveButton.textContent = "Save Changes";
                return;
            }

            try {

                currentTicket =
                    await updateTicket(
                        ticketId,
                        updates
                    );

                renderTicket();

                populateForm();

                renderNotes();

                showMessage(
                    "Ticket updated successfully.",
                    "success"
                );

            }

            catch (error) {
                const errorText = typeof error === "string"
                    ? error
                    : error?.message || JSON.stringify(error) || "An unknown error occurred.";

                showMessage(
                    errorText,
                    "error"
                );

            }

            finally {

                saveButton.disabled = false;

                saveButton.textContent =
                    "Save Changes";

            }

        }
    );

    /**
 * Add an internal note.
 */
noteButton.addEventListener(
    "click",
    async function () {

        const textarea =
            document.getElementById("noteText");

        const noteText =
            textarea.value.trim();

        if (!noteText) {

            return;

        }

        noteButton.disabled = true;

        noteButton.textContent =
            "Adding...";

        try {

            currentTicket =
                await updateTicket(
                    ticketId,
                    {
                        noteText: noteText
                    }
                );

            textarea.value = "";

            renderTicket();

            populateForm();

            renderNotes();

            showMessage(
                "Note added successfully.",
                "success"
            );

        }

        catch (error) {
            const errorText = typeof error === "string"
                ? error
                : error?.message || JSON.stringify(error) || "An unknown error occurred.";

            showMessage(
                errorText,
                "error"
            );

        }

        finally {

            noteButton.disabled = false;

            noteButton.textContent =
                "Add Note";

        }

    }
);

window.onload = loadTicket;