import { clearCookie } from "../scripts/helpers/token.helper";
import fetch from "node-fetch";

export const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken;
        console.log('this is a token: (jobflix-main)', token);
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "you are not authorized. Please login",
            });
        }

        // check if user is logged in (api call to auth service)
        const response = await fetch(`${process.env.AUTH_SERVICE_URL}/auth/verify-session}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        });
        if (!response.success) {
            clearCookie(res);
            return res.status(401).json({
                success: false,
                message: "you don't have a valid session. Please log back in"
            });
        }
        req.user = response?.user;
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "session expired. Try log back in",
        });
    }
}