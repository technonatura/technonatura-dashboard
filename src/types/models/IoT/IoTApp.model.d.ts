export interface sensorDataInterfaceI {
  date: number;
  data: number | boolean;
}
export interface sensorInterfaceI {
  name: string;
  desc: string;

  appId: string;
  userId: string;

  datas?: Array<sensorDataInterfaceI>;
  data: {
    data: A | B;
    dateAdded: number;
  };
  dataType: "number" | "boolean";
}

export interface TeammateInterface {
  userId: string;
  role: "owner" | "admin" | "viewer";
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
