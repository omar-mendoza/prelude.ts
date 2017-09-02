import { WithEquality } from "./Util";
import { Value} from "./Value";

export interface ISet<T> extends Value {
    
    size(): number;
    add(elt: T & WithEquality): ISet<T>;
    toArray(): Array<T & WithEquality>;
}
