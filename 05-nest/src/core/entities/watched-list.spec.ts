import { WatchedList } from "./watched-list";

class NumberWatchedList extends WatchedList<number> {
  compareItems(a: number, b: number): boolean {
    return a === b;
  }
}

describe("Watched List", () => {
  it("should be able to create a watched list with initial items", () => {
    const list = new NumberWatchedList([1, 2, 3]);

    expect(list.currentItems).toHaveLength(3);
  });

  it("should be able to add new item from a watched list", () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.add(4);

    expect(list.currentItems).toHaveLength(4);
    expect(list.getNewItems()).toEqual([4]);
  });

  it("should be able to remove item from a watched list", () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.remove(2);

    expect(list.currentItems).toHaveLength(2);
    expect(list.getRemovedItems()).toEqual([2]);
  });

  it("should be able to add and remove item from a watched list", () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.remove(2);
    list.add(2);

    expect(list.currentItems).toHaveLength(3);
    expect(list.getRemovedItems()).toEqual([]);
  });

  it("should be able to update a watched list correcly", () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.update([1, 4, 3, 5]);

    expect(list.currentItems).toHaveLength(4);
    expect(list.getRemovedItems()).toEqual([2]);
    expect(list.getNewItems()).toEqual([4, 5]);
  });
});
