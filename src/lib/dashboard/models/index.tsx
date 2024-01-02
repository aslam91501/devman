import { RecordBase } from "../../shared/config/baseModels";

export interface Project extends RecordBase{
    title: string;
    description: string;
}