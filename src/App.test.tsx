import { configure, shallow } from "enzyme";
import { App } from "./App";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("<App> test", () => {
  const setUp = () => {
    return shallow(<App />);
  };

  test("renders correctly", () => {
    const wrapper = setUp();

    const addButton = wrapper.find("button").at(0);
    addButton.simulate("click");
    expect(wrapper.find("AddPropertyModal").exists()).toBe(true);
  });
});
