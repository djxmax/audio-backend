import { createUploadthing, type FileRouter } from "uploadthing/express";

const f = createUploadthing();

export const ourFileRouter = {
  // Définition pour les fichiers audio
  audioUploader: f({ audio: { maxFileSize: "8MB" } })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload terminé pour :", file.ufsUrl);
    }),
    
  // Définition pour les images de couverture
  imageUploader: f({ image: { maxFileSize: "2MB" } })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Image uploadée :", file.ufsUrl);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;