import { Stream } from "../src/Stream";
import { Vector } from "../src/Vector";
import { Option } from "../src/Option";
import { MyClass} from "./SampleData";
import { HashMap} from "../src/HashMap";
import * as SeqTest from "./Seq";
import * as assert from 'assert'

SeqTest.runTests("Stream",
                 Stream.ofIterable,
                 Stream.ofStruct,
                 Stream.empty);

describe("Stream basics", () => {
    it("creates a continually constant value", () => assert.deepEqual(
        [1,1,1,1], Stream.continually(() => 1).take(4).toArray()));
    it("iterates from a seed", () => assert.deepEqual(
        [1,2,4,8], Stream.iterate(1, x => x*2).take(4).toArray()));
    it("maps correctly", () => assert.deepEqual(
        [4,5,7,11], Stream.iterate(1, x => x*2).map(x => x+3).take(4).toArray()));
    it("supports ofArray", () => assert.deepEqual(
        [1,2,3], Stream.ofIterable([1,2,3]).toArray()));
    it("supports of", () => assert.deepEqual(
        [1,2,3], Stream.of(1,2,3).toArray()));
    it("supports append", () => assert.deepEqual(
        [1,2,3,4], Stream.of(1,2,3).append(4).toArray()));
    it("supports appendAll", () => assert.deepEqual(
        [1,2,3,4,5], Stream.of(1,2,3).appendAll([4,5]).toArray()));
    it("supports cycle", () => assert.deepEqual(
        [1,2,3,1,2,3,1,2], Stream.of(1,2,3).cycle().take(8).toArray()));
    it("supports appendStream", () => assert.deepEqual(
        [1,2,3,4,5,6], Stream.of(1,2,3).appendStream(Stream.of(4,5,6)).toArray()));
    it("supports flatMap", () => assert.deepEqual(
        [1,2,3,4,5,6], Stream.of(1,4).flatMap(x => Stream.of(x,x+1,x+2)).toArray()));
    it("gets the last value correctly", () => assert.equal(
        3, Stream.of(1,2,3).last().getOrThrow()));
    it("gets the last value correctly for an empty stream", () => assert.ok(
        Stream.empty().last().isNone()));
});

describe("Stream filtering", () => {
    it("implements takeWhile correctly", () => assert.deepEqual(
        [1,2,3], Stream.iterate(1, x=>x+1).takeWhile(x=>x<4).toArray()));
    it("filters correctly", () => assert.deepEqual(
        [8,32,64,128], Stream.iterate(1, x => x*2).filter(x => x>5 && (x<15 || x > 30)).take(4).toArray()));
});

describe("Stream conversions", () => {
    it("converts to vector", () => assert.ok(
        Vector.of(1,2,3).equals(Stream.iterate(1, x => x+1).take(3).toVector())));
    it("transforms to map", () => {
        assert.ok(HashMap.empty<number,string>().put(1,"ok").put(2, "bad")
                  .equals(<HashMap<number,string>>Stream.ofStruct<[number,string]>([1,"ok"],[2,"bad"]).toMap(x => x)));
    });
});
