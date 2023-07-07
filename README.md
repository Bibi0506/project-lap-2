<!-- Project Title -->
# Dotmocracy
# Description
Unity is a job posting website developed by Florin County Council to engage and inspire the local community into taking on volunteering roles. Our aim is to improve the camaraderie of the area, keeping the local businesses open, whilst cutting our spending habits.
Users are able to register as either a business or a volunteer. Organisations can then post volunteering roles that are needed which will be added to the job board for volunteers. Clicking 'Apply online' will allow volunteers to apply for that volunteering role, helping to sustain the local community.
Key features of the website include:
- A job board for businesses and volunteers
- Easy login and registration process for both organisations and prospective volunteers
- The ability to post a new volunteering role as an organisation
- Displays all available jobs to the volunteer and allows them to register their interest
- Calendar displaying all upcoming jobs for a volunteer

# To Install for Development
1. Copy the SSH key on the GitHub Repo.
2. Open your terminal and navigate to the desired directory using the command `cd <write file path here>`.
3. Run the command `git clone <Paste SSH key here>`.
4. Run the command `npm install` to install the required dependencies.
5. Open your browser and navigate to the `ElephantSQL` website and sign up.
6. Create an instance, then copy the URL in the `Details` section.
7. Run the command `code .` in the terminal to open the project in VSCode.
8. In the server folder create a file called `.env`.
9. In this file paste the following 
    `PORT = 3002`
    `DB_URL = <Paste the Database URL here`
    `TEST_DB_URL = <Repeat the process of making a new database if you need to do testing>`
    `BCRYPT_SALT_ROUNDS = 10`
10. Run the commands `cd server` & `npm run dev` in the terminal.
11. Open the project using live server from the `index.html` file located inside the client and homepage directories.

# Running the App From the Browser
- If you do not want to develop the app further but would like to see it in action, there is a hosted version available from the following URL `https://project-council-site.onrender.com/`

# Known Bugs
- If a user has more than one volunteering position on a given day, the calendar will display these positions in a way that is inconsistent with the rest of the page.

# Planned Improvements
- List the Applicants for each job
- Filter system for jobs
- Delete job button
- Email Verification

# Contributors
- Alex Earle
- Dan Scott
- Roberta Capuano
- Sabrina Wright
- Oliver Thomas