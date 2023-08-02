import { Schema, model, Document } from "mongoose";

export interface IMovie extends Document {
  title: string;
  episode_id?: number;
  opening_crawl?: string;
  director?: string;
  producer?: string;
  release_date?: Date;
  characters?: string[];
  planets?: string[];
  starships?: string[];
  vehicles?: string[];
  species?: string[];
  created?: Date;
  edited?: Date;
  url?: string;
}

const movieSchema = new Schema<IMovie>({
  title: { type: String, required: true },
  episode_id: { type: Number },
  opening_crawl: { type: String },
  director: { type: String },
  producer: { type: String },
  release_date: { type: Date },
  characters: { type: [String] },
  planets: { type: [String] },
  starships: { type: [String] },
  vehicles: { type: [String] },
  species: { type: [String] },
  created: { type: Date },
  edited: { type: Date },
  url: { type: String },
});

const movieModel = model<IMovie>("Movie", movieSchema);

export default movieModel;
