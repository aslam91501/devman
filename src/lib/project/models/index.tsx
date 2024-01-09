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

export interface Item extends RecordBase{
    name: string,
    done: boolean,
    type: ItemType
    subfeature: string
}

export type ItemType = 'todo' | 'test' | 'business';

export interface Bug extends RecordBase{
    title: string,
    description: string,
    project: string,
    feature?: string,
    status: BugStatus,
    photos?: string[]
}

export type BugStatus = 'resolved' | 'unresolved' | 'triage';