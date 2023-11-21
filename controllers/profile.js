const handleProfileGet = (db) => (req, res) => {
    const { id } = req.params;
    db.select('*').from('users').where({id})
    .then(user => {
        console.log(user);
        if (user.length) {
            res.send(user[0]);
        } else {
            res.status(400).send('Not found');
        }
    })
    .catch(err => res.status(400).send('Error getting user'));
}

module.exports = {
    handleProfileGet: handleProfileGet
}