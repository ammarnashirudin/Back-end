export type CreatPeakInput = {
    roomId : number;
    startDate : Date;
    endDate : Date;
    value : number;
};

export type CreatePeakSeasonInput = {
    roomId : number;
    startDate : Date;
    endDate? : Date;
    dates? :Date[];
    type : "Nominal" | "Percentage";
    value : number;
};