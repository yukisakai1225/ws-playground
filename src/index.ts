import express from "express";

const app: express.Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
  },
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  console.log("http://localhost:3000");
});

type User = {
  id: number;
  name: string;
  email: string;
};

const users: User[] = [
  { id: 1, name: "user1", email: "u1@example.com" },
  { id: 2, name: "user2", email: "u2@example.com" },
  { id: 3, name: "user3", email: "u3@example.com" },
];

app.get("/users", (req: express.Request, res: express.Response) => {
  res.send(JSON.stringify(users));
});
