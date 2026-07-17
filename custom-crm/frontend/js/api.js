/*
---------------------------------------------------------
Custom CRM

Centralized API layer.

Responsibilities
- Store the backend URL
- Handle all HTTP requests
- Normalize backend responses
- Throw friendly errors
- Provide shared helper functions
---------------------------------------------------------
*/

// Backend API URL
// For local GitHub Codespaces testing:
// const API_URL = "https://your-codespace-url-8000";

// Backend API (Railway Production)
const API_URL = "https://crmassessment-production.up.railway.app";

// Local development example:
// const API_URL = "http://127.0.0.1:8000";

/**
 * Handle API responses consistently.
 */
async function handleResponse(response) {

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        let errorMessage = "Something went wrong.";

        if (data) {
            if (typeof data.detail === "string") {
                errorMessage = data.detail;
            }
            else if (Array.isArray(data.detail)) {
                errorMessage = data.detail
                    .map(item => {
                        if (typeof item === "string") {
                            return item;
                        }
                        if (item?.msg) {
                            return item.msg;
                        }
                        if (item?.message) {
                            return item.message;
                        }
                        if (item?.loc) {
                            return `${item.loc.join(".")}: ${item.msg || item.message || ""}`;
                        }
                        return JSON.stringify(item);
                    })
                    .join(" ");
            }
            else if (typeof data.message === "string") {
                errorMessage = data.message;
            }
            else if (typeof data.detail === "object") {
                errorMessage = JSON.stringify(data.detail);
            }
        }

        throw new Error(errorMessage);
    }

    return data;

}

/**
 * Convert Firebase object into an array.
 *
 * Firebase returns:
 * {
 *   "-abc123": {...},
 *   "-xyz456": {...}
 * }
 *
 * We convert it into:
 * [
 *   {...},
 *   {...}
 * ]
 */
function normalizeTickets(data) {

    if (!data) {
        return [];
    }

    return Object.values(data);

}

/**
 * Format ISO timestamps into a friendly format.
 *
 * Example:
 * 2026-07-16T11:25:48Z
 *
 * becomes
 *
 * Jul 16, 2026, 11:25 AM
 */
function formatDate(dateString) {

    if (!dateString) {
        return "-";
    }

    return new Date(dateString).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit"
    });

}

/**
 * GET /tickets/
 */
async function getTickets() {

    const response = await fetch(`${API_URL}/tickets/`);

    const data = await handleResponse(response);

    return normalizeTickets(data);

}

/**
 * GET /tickets/{ticketId}
 */
async function getTicket(ticketId) {

    const response = await fetch(
        `${API_URL}/tickets/${ticketId}`
    );

    const data = await handleResponse(response);

    if (!data.success) {
        throw new Error(data.message || "Ticket not found.");
    }

    return data.ticket;

}

/**
 * POST /tickets/
 */
async function createTicket(ticketData) {

    const response = await fetch(
        `${API_URL}/tickets/`,
        {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(ticketData)

        }
    );

    return handleResponse(response);

}

/**
 * PUT /tickets/{ticketId}
 */
async function updateTicket(ticketId, updatedData) {

    const response = await fetch(
        `${API_URL}/tickets/${ticketId}`,
        {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(updatedData)

        }
    );

    const data = await handleResponse(response);

    if (!data.success) {
        throw new Error(data.message || "Unable to update ticket.");
    }

    return data.ticket;

}