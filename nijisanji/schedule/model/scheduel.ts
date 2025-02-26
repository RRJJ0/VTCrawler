import { DataRow } from "./data";
import { IncludeRow } from "./include";

export interface ScheduleData {
    data: Array<DataRow>;
    included: Array<IncludeRow>;
}