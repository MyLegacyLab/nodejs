import http from "node:http";

// HTTP Methods: GET | PUT | POST | PATCH | DELETE

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/users") {
    return res.end("List of users");
  }

  if (method === "POST" && url === "/users") {
    return res.end("User creation");
  }

  return res.end("Hello World");
});

server.listen(3333);
