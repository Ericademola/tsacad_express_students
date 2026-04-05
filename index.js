import express from "express";

const app = express();
app.use(express.json());

let students = [];

app.get("/", (_req, res) => {
    res.send(students);
});

app.post("/students", (req, res) => {
    const { id, name, email, address } = req.body;
    if (!id || !name || !email || !address) {
        return res.status(400).send("please enter all the fields");
    }
    const student = { id, name, email, address };
    students.push(student);
    res.status(201).send(student);
});

app.get("/students/:id", (req, res) => {
    const { id } = req.params;
    const index = students.findIndex((s) => s.id === id); // ✅ findIndex not find
    if (index === -1) return res.status(404).send("student not found");
    res.status(200).send(students[index]);
});

app.patch("/students/:id", (req, res) => {
    const { id } = req.params;
    const index = students.findIndex((s) => s.id === id); // ✅ findIndex not find
    if (index === -1) return res.status(404).send("student not found");
    students[index] = { ...students[index], ...req.body }; // ✅ saved back to array
    res.status(200).send(students[index]);
});

app.delete("/students/:id", (req, res) => {
    const { id } = req.params;
    const exists = students.some((s) => s.id === id);
    if (!exists) return res.status(404).send("student not found"); // ✅ 404 if not found
    students = students.filter((item) => item.id !== id);
    res.status(200).send(students);
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});