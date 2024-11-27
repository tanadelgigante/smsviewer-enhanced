# SMS Viewer and Exporter

A web-based application for parsing, viewing, and managing SMS backup files (in XML format) from the "SMS Backup & Restore" app (not affiliated with its developer). This version enhances the original application with added features such as a lightweight server setup using Node.js for automatic feeding of XML file and Docker for seamless deployment.

---

## **Features**
1. **Phone Number Normalization**
   - Automatically removes international and local prefixes for consistent formatting.
   - Prevents duplicate contacts caused by inconsistent phone number formats (e.g., +49, 0049, 0176).

2. **SMS Parsing**
   - Processes XML files containing SMS backup data.
   - Groups messages by normalized phone numbers for consolidated conversations.
   - Extracts key details like timestamps, message content, and type (sent/received).

3. **Contact Management**
   - Displays a searchable, scrollable list of unique contacts.
   - Dynamic filters to show all contacts, named contacts, or unknown numbers.

4. **Chat View**
   - Clean and organized chat window for viewing conversations.
   - Differentiates between sent and received messages.

5. **Export Options**
   - Export conversations in multiple formats:
     - **CSV:** For spreadsheets.
     - **JSON:** Machine-readable structured data.
     - **PDF:** Printable format for archiving.

6. **User-Friendly Design**
   - Drag-and-drop support for XML uploads.
   - Dynamic search and filter functionality for contacts and messages.
   - Light and dark mode options for better accessibility.

---

## **Modifications**
### **1. Lightweight Server**
- Introduced a Node.js-based server to:
  - Automatically load the latest SMS XML file from the `/sms` directory at startup.
  - Serve the XML data to the web-based application.
  - Provide APIs for exporting conversations in supported formats.
  
### **2. Docker Integration**
- Added Docker support for containerized deployment:
  - **Dockerfile:** Builds the application and server into a single container.
  - **docker-compose.yml:** Manages containerized services, ensuring portability and ease of setup.

### **3. Enhanced File Management**
- The application now loads the most recent XML file on startup if available, in addition to drag-and-drop support.
- Configurable `/sms` directory for storing backup files.

---

## **Built With**
- **HTML5:** For the application's structure.
- **CSS3 (Bootstrap):** For responsive and modern UI design.
- **JavaScript:** For dynamic XML processing and client-side interactivity.
- **Node.js:** Lightweight server for file management and API support.
- **jsPDF:** To generate PDF exports.
- **Bootstrap v5.x:** For styling and layout.
- **Font Awesome:** For optional icons in the UI.

---

## **Getting Started**

### **Prerequisites**
- A modern web browser (e.g., Chrome, Firefox, Edge).
- Docker and Docker Compose installed on your machine.

---

### **Setup**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/tanadelgigante/smsviewer-enhanced
   cd smsviewer-enhanced

   
2. **Build and run with Docker:**
   ```bash
      docker-compose up -d --build 
      
3. **Access the application:** 
   Open your browser and go to http://localhost:4001.

### **Usage**
Drag and drop your SMS backup XML file into the upload area.
Alternatively, place SMS backup files in the /sms directory (the latest file will be auto-loaded).
Browse contacts and select a conversation to view messages.
Use filters or search to find specific contacts or messages.
Export conversations in your desired format (CSV, JSON, or PDF).

### **External Dependencies**

*   jsPDF: For generating PDF exports.
*   Bootstrap: For responsive and modern UI.
*   Font Awesome: For optional icons in the UI.

Dependencies are automatically included in the project via CDNs in index.html.

### **License**
This project is licensed under the MIT License. See the LICENSE file for details.






   