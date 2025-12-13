const express = require("express");
const app = express();
const PORT = 8000;
const users = require("./MOCK_DATA.json");

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
            ${users.map(user => `<li>${user.first_name}</li>`).join("")}
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

