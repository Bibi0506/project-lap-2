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

<!-- Our main objectives with this project are:
- Ignite interest and curiosity in non-STEM subjects among children
- Foster a positive learning environment through gamification
- Encourage children to explore and pursue non-STEM-related opportunities
- Please note that this project is an ongoing effort, and we welcome contributions from educators, parents, and developers to enhance the game's content and features. Together,
- we can inspire the next generation of innovators. -->
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



# How to run the game
1. Within the server folder, run: `npm run dev`
2. Go to 'http://localhost:3000'
# API
- The api can be found at 'http://localhost:3000/api'. Here you can visit these links
1. **api/questions** to see a list of all the available questions
2. **api/slytherin** to receive 10 random questions from the Art category in JSON format
3. **api/gryffindor** to receive 10 random questions from the English category in JSON format
4. **api/ravenclaw** to receive 10 random questions from the Music category in JSON format
5. **api/hufflepuff** to receive 10 random questions from the Drama category in JSON format
# Features
- Footer and header change colors when hovering over a subject/house
- the quiz pages gives multiple chances so its enjoyable for every age group
- broomstick tracking you constant score
- a flippable card that gives you more information about the questions
# Contributers
The current Contributers are
- Alex Earle
- Abbie Wills
- Yaasif Mohammed
- Shanthi sree Addanki
We are planning on letting others contribute on the project like teachers, parents and developers in the near future
```
```