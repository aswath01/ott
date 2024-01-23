import { configFile } from "src/config";
import { v4 as uuidv4 } from "uuid";
import * as jwt from "jsonwebtoken";

export async function generateToken(name: String, role: String) {
  let token = jwt.sign(
    { name: name, role: role },
    "AIzaSyBtGuIOhOR6D1difgbeaPQtLtHYwwGe5wM",
    { expiresIn: "1h" }
  );
  return token;
}
