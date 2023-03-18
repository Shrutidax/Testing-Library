import { render, screen } from "@testing-library/react";
import App from "./App";

test('header renders with react testing tutorial in the document', () => {
  render(<App />);
  const linkElement = screen.getByText(/This is React Testing Tutorial/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders login component in the document', () => {
  const component = render(<App />);
  const childElement = component.getByLabelText("Email");
  expect(childElement).toBeInTheDocument();
});
