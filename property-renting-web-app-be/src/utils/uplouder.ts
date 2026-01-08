import { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const UPLOAD_DIR = "./uplouds"
const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];
const MAX_FILE_SIZE = 1024*1024;

export function uplouder(
    type : "memory" | "disk" = "memory",
    filePrefix? : string,
    folderName? : string,
){
    const storage = 
    type === "memory"
    ? multer.memoryStorage()
    : multer.diskStorage({
        destination: (_req, file, cb) => {
            const destination = folderName
            ? path.join(UPLOAD_DIR, folderName)
            : UPLOAD_DIR;
            cb(null, destination);
        },
        filename: (_req, file, cb) => {
            const ext = path.extname(file.originalname);
            const filename = filePrefix
            ? `${filePrefix}-${Date.now()}-${Math.round(Math.random())}${ext}`
            : `${Date.now()}-${Math.round(Math.random())}${ext}`;
            cb(null, filename);
        },
    });

    function fileFilter(
        _req : Request,
        file : Express.Multer.File,
        cb   : multer.FileFilterCallback
    ){
        const ext = path.extname(file.originalname).toLowerCase();
        if(!ALLOWED_EXTENSIONS.includes(ext)){
            return cb(
                new Error("Only image files (jpg, jpeg, png, webp) are allowed")
            );
        }
        cb(null, true);
    }
    return multer({storage, fileFilter, limits:{fileSize: MAX_FILE_SIZE}});
}

export function deleteFile(filePath: string){
    try {
        console.log(filePath);
        if(filePath && fs.existsSync(filePath)){
            fs.unlinkSync(filePath);
        }
    } catch (err) {
        console.log("error deleting file", err);
        throw err;
    }
}