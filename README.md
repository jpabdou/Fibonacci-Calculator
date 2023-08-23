<h1>What is this project?</h1>
A Fibonacci sequece calculation app that provides the first n Fibonacci numbers based on user input made with TypeScript, Next.js, and Prisma. The database used was originally SQLite and currently is Postgres.

---

<h2>How do I use this app?</h2>

- Starting with the cloned repository or the unzipped archive of the repository in your directory, open Terminal or Commmand Prompt, navigate to the root of the "fibonacci-calc" directory, and enter `npm install` to install dependencies.

- After waiting for the install to complete in Terminal or Command Prompt, enter `npm run dev` and open the site "http://localhost:3000" on your web browser. If port 3000 is in use, it might be a different name so check the url output on the terminal to confirm.

- Start at the homepage with a form with a single entry for a number. The number you enter is the number of Fibonacci numbers you want to have calculated and displayed. 
<img src="/images/2023-08-02 00.21.44 localhost 98ab2b53a433.jpg" alt="image of Fibonacci calculator homepage" />

- In the example here, I enter 3, but you can enter any number greater 0. Keep in mind that the calculator will not display past the 79th Fibonacci number due to safe integer limitations in JavaScript/TypeScript. Once you have selected how many numbers you want to display, click the green "Submit" button.
<img src="/images/2023-08-02 00.22.40 localhost 74f445929ffa.jpg" alt="image of Fibonacci calculator homepage with a 3 entered in the form" />

- Make sure you enter the number correctly before submitting. Clicking the "Submit" button with a blank input or a number less than or equal to 0 will result in an error.
<img src="/images/2023-08-02 00.32.55 localhost d5cefbd123d1.jpg" alt="image of Fibonacci calculator homepage with a 0 entered in the form and an error message" />

- You will be redirected to the Results page, where you can see the Fibonacci numbers you requested in a comma-separated list below. If you want to try the process again, click the "Home" link to return to the homepage.
<img src="/images/2023-08-02 00.22.58 localhost 8d62b2e6ce0b.jpg" alt="image of Fibonacci calculator results page with the first 3 Fibonacci numbers displayed" />
