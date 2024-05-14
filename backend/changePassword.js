const DatabaseController = require('./database');

class changePassword {

    static changePass = async (email, newPassword) => {
        const filter = { email: email };
        const update = { $set: { password: newPassword } };
    
        try {
            await DatabaseController.updateItem("users", filter, update);
            return { success: true, message: "Password updated successfully" };
        } catch (error) {
            console.error("Error updating password:", error);
            return { success: false, message: "Failed to update password" };
        }
    }

}

module.exports = changePassword;