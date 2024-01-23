import mongoose, { Document, Schema } from "mongoose";

interface Imovie extends Document {
  title: String;
  genre: String;
  rating: String;
  streamingLink: String;
  active: Boolean;
}

const movieLobby = new Schema<Imovie>(
  {
    title: {
      type: String,
      required: false,
    },
    genre: {
      type: String,
      required: false,
    },
    rating: {
      type: String,
      required: false,
    },
    streamingLink: {
      type: String,
      required: false,
    },
    active: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<Imovie>("Movie", movieLobby);

export default UserModel;
