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
const API_BASE_URL = "https://curly-space-goldfish-5vgj4vprp4j3vg5j-8000.app.github.dev";

// TODO: Replace with production URLs when deploying:
// - Firebase Hosting: Your frontend will be deployed here
// - Railway: Update API_BASE_URL to your Railway backend URL
// Example production setup:
// const API_BASE_URL = "https://your-railway-backend-url.railway.app";

/**
 * Handle API responses consistently.
 */
async function handleResponse(response) {

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Something went wrong.");
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

    const response = await fetch(`${API_BASE_URL}/tickets/`);

    const data = await handleResponse(response);

    return normalizeTickets(data);

}

/**
 * GET /tickets/{ticketId}
 */
async function getTicket(ticketId) {

    const response = await fetch(
        `${API_BASE_URL}/tickets/${ticketId}`
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
        `${API_BASE_URL}/tickets/`,
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
        `${API_BASE_URL}/tickets/${ticketId}`,
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