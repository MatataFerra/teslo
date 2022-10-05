import mongoose, { ConnectOptions } from "mongoose";

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */
const mongoConnection = {
  isConnected: 0,
};

export const connect = async () => {
  const options: ConnectOptions = {
    dbName: "tesloapp",
  };
  if (mongoConnection.isConnected) {
    console.log("The database is already connected");
    return;
  }

  if (mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState;

    if (mongoConnection.isConnected === 1) {
      console.log("Using existing database connection");
      return;
    }

    if (mongoConnection.isConnected === 2) {
      console.log("Database is connecting...");
      return;
    }

    console.log(
      "Disconnecting existing database connection state: ",
      mongoose.connections[0].readyState
    );
    await mongoose.disconnect();
  }

  await mongoose.connect(process.env.MONGO_URL || "", options);
  mongoConnection.isConnected = 1;
  console.log("Connecting to MongoDB");
};

export const disconnect = async () => {
  if (process.env.NODE_ENV === "development") return;

  if (mongoConnection.isConnected === 0) return;

  await mongoose.disconnect();
  mongoConnection.isConnected = 0;

  console.log("Disconnecting to MongoDB");
};
