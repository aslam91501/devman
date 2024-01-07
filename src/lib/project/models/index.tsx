import { RecordBase } from "../../shared/config/baseModels";

export interface Feature extends RecordBase{
    name: string,
    description: string,
    project: string
}