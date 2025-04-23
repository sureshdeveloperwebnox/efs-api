import { IDateTime } from "@/modules/model";
import { Request } from "express";


export const getDateTime = async(req: Request): Promise<IDateTime> => {
  const date_time = req.headers["date_time"] as string;

  if (!date_time) {
    throw new Error("Missing date_time header");
  }

  return { date_time };
};
