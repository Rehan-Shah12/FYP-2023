# FYP-2023

Project Code: FA22CS01
Project Name: CHOICE
Developers: Syed Rehan Ali Shah (FA19-BCS-082) (Team Leader), Syed Hamza Imran (FA19-BCS-131)
Supervisors: Mr. Abdul Karim Shahid (Supervisor), Mr. Mohsin Mehdi (Co-Supervisor)

Project Details:

Installation:

-> First install the dependencies by using this command : "npm install"
(*You have to install these dependencies in the root folder as well as in client folder)
(*To navigate the terminal to client folder, type "cd client", to navigate back type "cd ..")
(\*If for some reason if it shows "Conflicting peer dependency" issue, use "npm install --force" command to bypass it)

Run:

-> To run the command, Type "npm run dev", in the project root folder (not the client folder) to run both frontend and backend
(\*server-side will run on localhost:8080, client-side will run on localhost:3000)

Code Description:

-> The server-side code is in project root folder, the client-side code (front-end) is in client folder.
-> Scraper code in in "scrape.js" file It will run with the rest of code
-> Server Side controllers in controller folder, routers in routes folder, Schema models in models folder and so on
-> search_data.json file stores the scrape products, don't delete it
-> Front-end Code is in client > src folder
-> Admin Pages are stored in Admin Folder inside Page folder, Same as for Pages invloving authorization in Auth Folder and user pages in User Folder.

Project Related Information:

-> To run the scraper, Search a query (product) on the search page, wait for the chrmoium window to appear, When it closes, it would display the data it had scrapped. Don't close the chromium window as it will cancel the query given to scraper and it will cancel its action.
-> To do Admin Actions, Login as an Admin
Email: admin@admin.com
Pass : 123
-> To access the Chatbot, Click on the Floating Pink Chat button on the Homepage, a Chat-box will appear.
