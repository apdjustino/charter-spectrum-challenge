const axios = require("axios");
import { getData, filter } from "./index";

jest.mock("axios");

it("checks if the right fetch data object returns the correct properties", async () => {
  axios.get.mockResolvedValue({
    data: [
      { name: "test1", state: "NM", attire: "casual", genre: "Asian,International" },
      { name: "test2", state: "CO", attire: "formal", genre: "American" },
      { name: "test3", state: "CA", attire: "business casual", genre: "Mexican" },
    ],
  });

  const { genres, states, attire, restaurantData } = await getData();
  expect(genres).not.toBeUndefined();
  expect(states).not.toBeUndefined();
  expect(attire).not.toBeUndefined();
  expect(restaurantData).not.toBeUndefined();
  expect(restaurantData.length).toBeGreaterThan(0);
});

it("checks if filtering by state filters the data array correctly", async () => {
  const mockedState = {
    filteredData: [],
  };
  const setter = (data) => {
    mockedState.filteredData = data;
  };
  axios.get.mockResolvedValue({
    data: [
      { name: "test1", state: "CO", attire: "casual", genre: "Asian,International" },
      { name: "test2", state: "CO", attire: "formal", genre: "American" },
      { name: "test3", state: "CA", attire: "business casual", genre: "Mexican" },
    ],
  });
  const { genres, states, attire, restaurantData } = await getData();
  filter(restaurantData, "CO", "All", "All", "", setter);
  expect(mockedState.filteredData.length).toEqual(1);
});

it("checks if filtering by genre filters the data array correctly", async () => {
  const mockedState = {
    filteredData: [],
  };
  const setter = (data) => {
    mockedState.filteredData = data;
  };
  axios.get.mockResolvedValue({
    data: [
      { name: "test1", state: "CO", attire: "casual", genre: "Asian,International" },
      { name: "test2", state: "CO", attire: "formal", genre: "American" },
      { name: "test3", state: "CA", attire: "business casual", genre: "Mexican" },
    ],
  });
  const { genres, states, attire, restaurantData } = await getData();
  filter(restaurantData, "All", "International", "All", "", setter);
  expect(mockedState.filteredData.length).toEqual(1);
});

it("checks if filtering by attire filters the data array correctly", async () => {
  const mockedState = {
    filteredData: [],
  };
  const setter = (data) => {
    mockedState.filteredData = data;
  };
  axios.get.mockResolvedValue({
    data: [
      { name: "test1", state: "CO", attire: "casual", genre: "Asian,International" },
      { name: "test2", state: "CO", attire: "formal", genre: "American" },
      { name: "test3", state: "CA", attire: "business casual", genre: "Mexican" },
    ],
  });
  const { genres, states, attire, restaurantData } = await getData();
  filter(restaurantData, "All", "All", "formal", "", setter);
  expect(mockedState.filteredData.length).toEqual(1);
});

it("checks if filtering with search string for name returns filtered data", async () => {
  const mockedState = {
    filteredData: [],
  };
  const setter = (data) => {
    mockedState.filteredData = data;
  };
  axios.get.mockResolvedValue({
    data: [
      { name: "test1", city: "Denver", state: "CO", attire: "casual", genre: "Asian,International" },
      { name: "test2", city: "Grand Junction", state: "CO", attire: "formal", genre: "American" },
      { name: "test3", city: "San Diego", state: "CA", attire: "business casual", genre: "Mexican" },
    ],
  });
  const { genres, states, attire, restaurantData } = await getData();
  filter(restaurantData, "All", "All", "All", "tes", setter);
  expect(mockedState.filteredData.length).toEqual(1);
});

it("checks if filtering with search string for city returns filtered data", async () => {
  const mockedState = {
    filteredData: [],
  };
  const setter = (data) => {
    mockedState.filteredData = data;
  };
  axios.get.mockResolvedValue({
    data: [
      { name: "test1", city: "Denver", state: "CO", attire: "casual", genre: "Asian,International" },
      { name: "test2", city: "Grand Junction", state: "CO", attire: "formal", genre: "American" },
      { name: "test3", city: "San Diego", state: "CA", attire: "business casual", genre: "Mexican" },
    ],
  });
  const { genres, states, attire, restaurantData } = await getData();
  filter(restaurantData, "All", "All", "All", "De", setter);
  expect(mockedState.filteredData.length).toEqual(1);
});

it("checks if filtering with search string and filter filtered data", async () => {
  const mockedState = {
    filteredData: [],
  };
  const setter = (data) => {
    mockedState.filteredData = data;
  };
  axios.get.mockResolvedValue({
    data: [
      { name: "test1", city: "Denver", state: "CO", attire: "casual", genre: "Asian,International" },
      { name: "test2", city: "Grand Junction", state: "CO", attire: "formal", genre: "American" },
      { name: "test3", city: "San Diego", state: "CA", attire: "business casual", genre: "Mexican" },
    ],
  });
  const { genres, states, attire, restaurantData } = await getData();
  filter(restaurantData, "CO", "All", "All", "Sa", setter);
  expect(mockedState.filteredData.length).toEqual(0);
});
