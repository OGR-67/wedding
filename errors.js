// Error handlers
const ERRORS_HANDLER = {
    11000: userAlreadyExists,
};

function userAlreadyExists(res) {
    let context = { error: "Vous vous êtes déja inscrit. Contacter moi directement pour effectuer une modification." };
    res.render("pages/form.ejs", context);
}

module.exports = ERRORS_HANDLER;