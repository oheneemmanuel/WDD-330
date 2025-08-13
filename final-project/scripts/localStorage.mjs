export const sidebar = document.querySelector('#sidebar');

export function showVisitMessage() {
    const now = Date.now();
    const lastVisit = localStorage.getItem('lastVisit');

    let message = '';

    if(!lastVisit) {
        message = 'Welcome! This is your visit !';
    } else {
        const diffMs = now - parseInt(lastVisit, 10);
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays < 1) {
            message = "This is Awesome!";

        } else {
            message = `You last visited ${diffDays} days ago`;
        }
    }

    // display the message in hte sidebar 
    const Msg = document.createElement('div');
    Msg.textContent = message;
    Msg.classList.add('visit-message');
    sidebar.appendChild(Msg);

    localStorage.setItem('lastVisit', now);

}
showVisitMessage();