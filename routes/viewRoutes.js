module.exports = app => {
    app.get('/', (req, res) => {
        res.send('logged')
    })

    app.post('/api/search', (req, res) => {
        
    })
    // app.get('/api/videos', )

}