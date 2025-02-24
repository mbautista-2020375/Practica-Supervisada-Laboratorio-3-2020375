import Publication from '../src/publication/publication.model.js';

export const verifyPublicationOwnership = async (req, res, next) => {
    console.log("Publication Ownership Verification:");

    try {
        const { user } = req; // Ya tenemos user desde validateJwt
        const { id } = req.params;

        const publication = await Publication.findById(id);

        if (!publication) {
            console.log("-> Publication not found.");
            return res.status(404).send({
                success: false,
                message: "Publication Ownership Verification -> Publication not found."
            });
        }
        if (publication.author.toString() !== user.id) {
            console.log(`-> Unauthorized access | username: ${user.username}`);
            return res.status(403).send({
                success: false,
                message: `Publication Ownership Verification -> Unauthorized access | username: ${user.username}`
            });
        }
        console.log("-> User authorized to delete this publication.");
        next(); 
    } catch (error) {
        console.error("-> Error verifying publication ownership:", error);
        return res.status(500).send({
            success: false,
            message: "Publication Ownership Verification -> Internal Server Error",
            error: error.message
        });
    }
};
