import { connect, ConnectOptions } from "mongoose";

//Método para conectarse a la BBDD de MongoDB
export const dbConnect = () => {
  connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions).then(
    () => {
      console.log("Connected successfully");
    },
    (error) => {
      console.log(error);
    }
  );
};
