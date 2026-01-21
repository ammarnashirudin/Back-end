import "dotenv/config";

const PORT = process.env.PORT || 8000;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || "";
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || "";
const CLOUDINARY_API_NAME = process.env.CLOUDINARY_API_NAME || "";
const SECRET_KEY =process.env.SECRET_KEY || "";
const GMAIL_EMAIL = process.env.GMAIL_EMAIL || "";
const GMAIL_APP_PASS = process.env.GMAIL_APP_PASS;
const APP_BASE_URL = process.env.APP_BASE_URL || "";

export {
    PORT,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    CLOUDINARY_API_NAME,
    SECRET_KEY,
    GMAIL_APP_PASS,
    GMAIL_EMAIL,
    APP_BASE_URL,
};
