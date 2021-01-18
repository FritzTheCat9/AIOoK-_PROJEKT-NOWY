import { render, screen } from "@testing-library/react";
import App from "./App";
import React from "react";
import { shallow } from "enzyme";
import ShowMovies from "./Movie/ShowMovies";
import AddMovieModal from "./Movie/AddMovieModal";
import DeleteMovie from "./Movie/DeleteMovie";
describe("<App/>", () => {
  let appScreen;
  let appInstance;

  beforeEach(() => {
    appScreen = shallow(<App />);
    appInstance = appScreen.instance();
  });

  afterEach(() => {
    appScreen = undefined;
    appInstance = undefined;
  });

  it("Child receives props from state", () => {
    const child = appScreen.find(ShowMovies);
    expect(child.length).toBe(1);
    expect(child.prop("movieList")).not.toBe(undefined);
  });

  it("Child receives func", () => {
    const child = appScreen.find(ShowMovies);
    expect(child.length).toBe(1);
    expect(child.prop("addMovie")).not.toBe(undefined);
  });
  it("renders static structure", () => {
    const appScreen = shallow(<App />);
    expect(appScreen.find("Route").length).toBe(7);
  });
});
