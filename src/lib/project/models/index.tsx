import { RecordBase } from "../../shared/config/baseModels";

export interface Feature extends RecordBase{
    name: string,
    description: string,
    project: string
}

export interface SubFeature extends RecordBase{
    name: string,
    description: string,
    feature: string
}