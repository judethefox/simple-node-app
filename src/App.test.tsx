import { configure, shallow } from "enzyme";
import { App } from "./App";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("Test <App> component", () => {
  const setUp = () => {
    return shallow(<App />);
  };

  test("renders correctly", () => {
    const wrapper = setUp();

    expect(wrapper.text()).toContain("Bar Charts");
    expect(wrapper.find("Button").exists()).toBe(true);
  });
});
