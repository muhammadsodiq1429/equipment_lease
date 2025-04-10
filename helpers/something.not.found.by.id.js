module.exports = (res, something, name) => {
    if (!something) {
        res.status(404).send({ message: `${name} with this ID was not found` });
        return false
    }
    return true
}