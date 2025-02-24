import Commentary from '../src/commentary/commentary.model.js';

export const verifyCommentaryOwnership = async (req, res, next) => {
    console.log("Commentary Ownership Verification:");

    try {
        const { user } = req;
        const { id } = req.params;

        const commentary = await Commentary.findById(id);

        if (!commentary) {
            console.log("-> Commentary not found.");
            return res.status(404).send({
                success: false,
                message: "Commentary Ownership Verification -> Commentary not found."
            });
        }
        if (commentary.author.toString() !== user.id) {
            console.log(`-> Unauthorized access | username: ${user.username}`);
            return res.status(403).send({
                success: false,
                message: `Commentary Ownership Verification -> Unauthorized access | username: ${user.username}`
            });
        }
        console.log("-> User authorized to delete this commentary.");
        next();
    } catch (error) {
        console.error("-> Error verifying commentary ownership:", error);
        return res.status(500).send({
            success: false,
            message: "Commentary Ownership Verification -> Internal Server Error",
            error: error.message
        });
    }
};
