import mongoose from "mongoose";
import { app } from "./app";

let server;
const PORT = 5000;
async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://mongodb:mongodb@cluster0.qttac.mongodb.net/libraryDB?retryWrites=true&w=majority&appName=Cluster0"
    );
    server = app.listen(PORT, () => {
      console.log(`server is listening on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
