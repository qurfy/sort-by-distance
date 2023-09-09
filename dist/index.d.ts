type Item = {
    [key: string]: any;
};
type FormulaType = "linear" | "haversine";

type SortByDistanceOptions = {
    yName?: string;
    xName?: string;
    type?: FormulaType;
};
declare const sortByDistance: (origin: Item, points: Item[], { yName, xName, type }?: SortByDistanceOptions) => Item[];

export { SortByDistanceOptions, sortByDistance as default, sortByDistance };
