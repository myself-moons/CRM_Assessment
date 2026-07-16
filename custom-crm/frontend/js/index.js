/*
---------------------------------------------------------
Dashboard Page

Responsibilities

- Load all tickets
- Display tickets
- Search tickets
- Filter tickets by status
- Refresh tickets
---------------------------------------------------------
*/

let tickets = [];

/**
 * Load tickets from the API.
 */
async function loadTickets() {

    const loading = document.getElementById("loading");
    const tableCard = document.getElementById("tableCard");
    const emptyState = document.getElementById("emptyState");

    loading.classList.remove("hidden");
    tableCard.classList.add("hidden");
    emptyState.classList.add("hidden");

    try {

        tickets = await getTickets();

        renderTickets();

    }

    catch (error) {

        loading.innerHTML =
            `Error: ${error.message}`;

    }

}

/**
 * Display tickets in the table.
 */
function renderTickets() {

    const tbody =
        document.getElementById("ticketTableBody");

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();

    const status =
        document
            .getElementById("statusFilter")
            .value;

    const filteredTickets =
        tickets.filter(ticket => {

            const matchesSearch =

                ticket.ticketId
                    .toLowerCase()
                    .includes(search)

                ||

                ticket.customerName
                    .toLowerCase()
                    .includes(search)

                ||

                ticket.customerEmail
                    .toLowerCase()
                    .includes(search)

                ||

                ticket.subject
                    .toLowerCase()
                    .includes(search);

            const matchesStatus =
                !status ||
                ticket.status === status;

            return matchesSearch &&
                matchesStatus;

        });

    document
        .getElementById("loading")
        .classList.add("hidden");

    tbody.innerHTML = "";

    if (filteredTickets.length === 0) {

        document
            .getElementById("emptyState")
            .classList.remove("hidden");

        document
            .getElementById("tableCard")
            .classList.add("hidden");

        return;

    }

    // Hide empty state when there are tickets
    document
        .getElementById("emptyState")
        .classList.add("hidden");

    document
        .getElementById("tableCard")
        .classList.remove("hidden");

    filteredTickets.forEach(ticket => {

        let statusClass = "status-open";

        if (ticket.status === "In Progress")
            statusClass = "status-progress";

        if (ticket.status === "Closed")
            statusClass = "status-closed";

        tbody.innerHTML += `

<tr>

<td>${ticket.ticketId}</td>

<td>${ticket.customerName}</td>

<td>${ticket.customerEmail}</td>

<td>${ticket.subject}</td>

<td>${formatDate(ticket.createdAt)}</td>

<td>

<span class="status ${statusClass}">

${ticket.status}

</span>

</td>

<td>${formatDate(ticket.updatedAt)}</td>

<td>

<button
class="btn-primary"
onclick="viewTicket('${ticket.ticketId}')">

View

</button>

</td>

</tr>

`;

    });

}

/**
 * Navigate to ticket page.
 */
function viewTicket(ticketId) {

    window.location.href =
        `ticket.html?ticketId=${ticketId}`;

}

document
    .getElementById("searchInput")
    .addEventListener(
        "input",
        renderTickets
    );

document
    .getElementById("statusFilter")
    .addEventListener(
        "change",
        renderTickets
    );

document
    .getElementById("refreshButton")
    .addEventListener(
        "click",
        loadTickets
    );

window.onload = loadTickets;