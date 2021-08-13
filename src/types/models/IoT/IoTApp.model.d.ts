export interface sensorDataInterfaceI<A, B> {
  date: number;
  data: A | B;
}
export interface sensorInterfaceI<A, B> {
  name: string;

  appId: string;
  userId: string;

  datas?: Array<sensorDataInterfaceI<A, B>>;
  data: {
    data: A | B;
    dateAdded: number;
  };
  dataType: "number" | "boolean";
}

export interface TeammateInterface {
  userId: string;
  role: "owner" | "admin" | "viewer" | "blocked";
  receiveNotification: boolean;
}
export interface IoTAppInterface {
  _id: string;
  name: string;
  desc: string;

  own: string;

  token: {
    token: string;
    tokenCreated: number;
  };

  sensors: Array<string>;

  isTeam: boolean;
  team: Array<TeammateInterface>;

  visibility: "public" | "private";
}
