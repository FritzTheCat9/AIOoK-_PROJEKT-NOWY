import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";
import React from "react";
import { shallow } from "enzyme";

describe("<Navbar/>", () => {
  it("renders", () => {
    const appScreen = shallow(<Navbar />);
    expect(appScreen.exists()).toBe(true);
  });
  it("renders static structure", () => {
    const appScreen = shallow(<Navbar />);
    expect(appScreen.first().type()).toBe("nav");
  });
  it("renders correct text", () => {
    const appScreen = shallow(<Navbar />);
    expect(appScreen.find("li").length).toEqual(4);
    expect(appScreen.find("li").at(0).text()).toEqual("Home");
    expect(appScreen.find("li").at(1).text()).toEqual("Rooms");
    expect(appScreen.find("li").at(2).text()).toEqual("Screening");
    expect(appScreen.find("li").at(3).text()).toEqual("Seances");
  });
});
