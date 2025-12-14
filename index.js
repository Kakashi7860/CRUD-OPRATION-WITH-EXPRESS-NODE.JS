const express = require("express");
const app = express();
const PORT = 8000;
const users = require("./MOCK_DATA.json");
app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});

//API 1
app.get("/api/users", (req, res) => {
    res.json(users);
});

//Optional - API (HTML)
app.get("/api/users/html", (req, res) => {
    let html = `
        <ul>
            ${users.map(user => `<li>${user.job_title}</li>`).join("")}
        </ul>
    `;
    res.send(html);
});

//API - 2
app.get("/api/users/:id",(req,res)=>{
    const id = Number(req.params.id)
    const user = users.find((user)=>user.id==id);

    return res.json(user)

})

app.patch("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Update only provided fields
    Object.assign(user, req.body);

    return res.json({
        status: "success",
        updatedUser: user
    });
});
