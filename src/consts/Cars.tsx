export type CarType = "electrical" | "2 wheels" | "sport";

export interface ICars {
  type: CarType;
  fullName: string;
  color: string;
  seats: number;
  tires: string;
}

export const Cars: ICars[] = [
  {
    type: "electrical",
    fullName: "Tesla Model X",
    color: "white",
    seats: 5,
    tires: "Dry Performance",
  },
  {
    type: "electrical",
    fullName: "Tesla Model X",
    color: "black",
    seats: 5,
    tires: "Wet Performance",
  },
  {
    type: "electrical",
    fullName: "Tesla Model Y",
    color: "black",
    seats: 6,
    tires: "Dry Performance",
  },

  {
    type: "sport",
    fullName: "Ferrari Model X",
    color: "yellow",
    seats: 2,
    tires: "Dry Performance",
  },
  {
    type: "sport",
    fullName: "Ferrari Model X",
    color: "orange",
    seats: 2,
    tires: "Wet Performance",
  },
  {
    type: "sport",
    fullName: "Ferrari Model Y",
    color: "orange",
    seats: 3,
    tires: "Dry Performance",
  },

  {
    type: "2 wheels",
    fullName: "Ford Model X",
    color: "yellow",
    seats: 2,
    tires: "Dry Performance",
  },
  {
    type: "2 wheels",
    fullName: "Ford Model X",
    color: "orange",
    seats: 2,
    tires: "Wet Performance",
  },
  {
    type: "2 wheels",
    fullName: "Ford Model Y",
    color: "orange",
    seats: 3,
    tires: "Dry Performance",
  },
];
