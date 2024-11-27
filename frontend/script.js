document.addEventListener("DOMContentLoaded", function () {
    const uploadArea = document.getElementById("upload-area");
    const fileInput = document.getElementById("file-input");
    const chatWindow = document.getElementById("chat-window");
    const contactList = document.getElementById("contact-list");

    // Function to load XML data via drag-and-drop or upload
    const loadXML = (xmlText) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "application/xml");
        const parseError = xmlDoc.querySelector("parsererror");

        if (parseError) {
            alert("Invalid XML file!");
            return;
        }
        displayMessages(xmlDoc);
    };

    // Fetch the most recent XML file from the server on page load
	fetch("http://backend:3000/get-latest-sms")
	    .then((response) => {
	        if (!response.ok) throw new Error("Failed to load the XML file");
	        return response.text();
	    })
	    .then(loadXML)
	    .catch((error) => {
	        console.error(error);
	        alert("Error loading XML file. Please upload a valid XML.");
	    });

    // Drag-and-drop event listeners
    uploadArea.addEventListener("dragover", (e) => {
        e.preventDefault();
        uploadArea.classList.add("hover");
    });

    uploadArea.addEventListener("dragleave", () => {
        uploadArea.classList.remove("hover");
    });

    uploadArea.addEventListener("drop", (e) => {
        e.preventDefault();
        uploadArea.classList.remove("hover");
        const file = e.dataTransfer.files[0];
        if (file && file.type === "text/xml") {
            const reader = new FileReader();
            reader.onload = () => loadXML(reader.result);
            reader.readAsText(file);
        } else {
            alert("Please upload a valid XML file.");
        }
    });

    // File input event listener (click event to open file dialog)
    uploadArea.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];
        if (file && file.type === "text/xml") {
            const reader = new FileReader();
            reader.onload = () => loadXML(reader.result);
            reader.readAsText(file);
        } else {
            alert("Please upload a valid XML file.");
        }
    });

    // Display messages in the chat window
    const displayMessages = (xmlDoc) => {
        const messages = xmlDoc.querySelectorAll("sms");
        const contacts = {};

        messages.forEach((message) => {
            const number = message.getAttribute("address");
            const text = message.getAttribute("body");
            const type = message.getAttribute("type"); // 1 = incoming, 2 = outgoing

            if (!contacts[number]) contacts[number] = [];
            contacts[number].push({ text, type });
        });

        // Populate contact list
        contactList.innerHTML = "";
        for (const contact in contacts) {
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.textContent = contact;
            li.addEventListener("click", () => {
                chatWindow.innerHTML = ""; // Clear current chat window
                contacts[contact].forEach((msg) => {
                    const card = document.createElement("div");
                    card.className = `card mb-2 ${msg.type === "1" ? "incoming" : "outgoing"}`;
                    card.innerHTML = `
                        <div class="card-body">
                            <p class="card-text">${msg.text}</p>
                        </div>
                    `;
                    chatWindow.appendChild(card);
                });
            });
            contactList.appendChild(li);
        }
    };
});
