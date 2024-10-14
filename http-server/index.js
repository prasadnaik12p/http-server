const http = require("http");
const fs = require("fs");
const minimist = require("minimist");

let homeContent = "";
let projectContent = "";
let registrationContent = "";

// Parse the command-line arguments for the port
const args = minimist(process.argv.slice(2));
const port = args.port || 3000; // Default port is 3000 if no port is supplied

// Read home.html file
fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homeContent = home;

  // Read project.html file
  fs.readFile("project.html", (err, project) => {
    if (err) {
      throw err;
    }
    projectContent = project;

    // Read registration.html file
    fs.readFile("registration.html", (err, registration) => {
      if (err) {
        throw err;
      }
      registrationContent = registration;

      // Create the server
      http.createServer((request, response) => {
        let url = request.url;
        response.writeHead(200, { "Content-Type": "text/html" });

        switch (url) {
          case "/project":
            response.write(projectContent);
            response.end();
            break;
          case "/registration":
            response.write(registrationContent);
            response.end();
            break;
          default:
            response.write(homeContent);
            response.end();
            break;
        }
      }).listen(port, () => {
        console.log(`Server is listening on port ${port}`);
      });
    });
  });
});
