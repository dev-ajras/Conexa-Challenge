import mongoose from "mongoose";
export function databaseAccess() {
  mongoose
    .connect(process.env.urlmongo!, {})
    .then(() => console.log("Database connection stablished"))
    .catch((e) => console.log("Error connection: " + e));
}
