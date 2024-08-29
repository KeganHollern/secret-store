const express = require('express');
const path = require('node:path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the editor page at the root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'editor.html'));
});

// Serve the viewer page when a secretId is provided
app.get('/:secretId', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'viewer.html'));
});

// Create a router object for the API routes
const apiRouter = express.Router();
apiRouter.use(express.json())

const secrets = {}

apiRouter.post('/secret', (req, res) => {
    const secretJson = req.body; // Assuming the request body contains the JSON data for the secret


    let randomSecretId = Math.random().toString(36).substr(2, 9);

    // if randomSecretId in secrets then regenerate
    while (randomSecretId in secrets) {
        randomSecretId = Math.random().toString(36).substr(2, 9);
    }

    // TODO: write secretJson to a DB
    console.log(`storing secret ${randomSecretId}`)
    secrets[randomSecretId] = secretJson;

    res.status(200).json({ secretId: randomSecretId }); // Send the generated secret ID back to the client
}); // this is where we would save a new secret in the database
apiRouter.get('/secret', (req, res) => {
    const secretId = req.query.secretId
    console.log(`trying to get secret ${secretId}`)
    if (secretId in secrets) {
        console.log("secret found 😀");
        res.status(200).json(secrets[secretId]) // Send the secret back to the client
        delete secrets[secretId] // Delete the secret after sending it to the client
        return
    }
    console.log("secret not found 🥲")
    res.status(404).json({ error: 'Secret not found' }) // Send an error message if the secret ID is not found in the secrets object
}); // This is where we would get a secret from the database and send it back to the client

app.use("/api", apiRouter)

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
