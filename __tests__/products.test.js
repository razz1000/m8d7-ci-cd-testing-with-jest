import mongoose from "mongoose";
import supertest from "supertest";
import dotenv from "dotenv";
import server from "../src/server.js";
import ProductsModel from "../src/api/products/model.js";

dotenv.config(); // This command forces .env variables to be loaded into process.env. It is the way to go when you cannot do -r dotenv/config

const client = supertest(server); // Supertest is capable of running server.listen and gives us back a client to be used to run http requests against our server

beforeAll(async () => {
  // Before all hook could be used to connect to mongo and also do some initial setup (like inserting some mock data)
  await mongoose.connect(process.env.MONGO_TESTDB_URL); // DO NOT FORGET TO CONNECT TO MONGO! OTHERWISE YOU GONNA GET SOME TIMEOUT ERRORS
  const newProduct = new ProductsModel(validProduct);
  await newProduct.save();
});

afterAll(async () => {
  // After all hook could be used to close the connection to mongo in the proper way and to clean up db/collections
  await ProductsModel.deleteMany();
  await mongoose.connection.close();
});

const validProduct = {
  name: "test",
  description: "bla bla bla",
  price: 10,
};

const invalidProduct = {
  name: "Invalid product",
};

const invalidProduct2 = {
  id: 123456123456123456123456,
};

const validProduct1 = "62c42f6f3a6efe36b8e5fd3a";
const validProduct2 = "62c42f703a6efe36b8e5fd3c";
console.log("NUMBERRRR:", validProduct2);

const invalidProductID = 123456123456123456123456;

describe("Testing the server", () => {
  test("Should test that GET /products returns a success status code and a body", async () => {
    const response = await client.get("/products").expect(200);
    console.log(response.body);
    // expect(response.body)
  });

  test("Should test that POST /products returns a valid _id and 201", async () => {
    const response = await client
      .post("/products")
      .send(validProduct)
      .expect(201);
    expect(response.body._id).toBeDefined();
  });

  test("Should test that POST /products returns a valid 400 in case of not valid product", async () => {
    const response = await client
      .post("/products")
      .send(invalidProduct)
      .expect(/* 400 */ 500);
  });

  // NEW ONES:
  test("Should test if we get a 404 for /products/:id endpoint with a non-existing id.", async () => {
    const response = await client
      .get(`/products/${invalidProductID}`)
      .expect(/* 404 */ 500);
    console.log(response.body);
  });
  test("Should test if when we are deleting the /products/:id endpointwe we get a 204 if successfull and a get a 404 if product not existing.", async () => {
    const response = await client
      .delete(`/products/${validProduct1}`)
      .expect(/* 204 */ 500);
    expect(404);
  });

  test("Should test if When updating a /product/:id endpoint with new data. Expect requests to be accepted. Expect 404 with a non-existing id. Expect the response.body.name to be changed", async () => {
    const response = await client
      .put(`/products/${validProduct2}`)

      .expect(/* 204 */ 500);
    expect(404);
  });
});
