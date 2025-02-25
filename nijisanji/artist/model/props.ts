import { Liver } from "./liver";
import { Fanclub } from "./fanclub";

export interface Props {
    locale: string;
    allLivers: Array<Liver>;
    allFanclubs: Array<Fanclub>;
    // other looks not need
}