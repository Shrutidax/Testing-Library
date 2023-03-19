import { render,screen } from "@testing-library/react";
import Login from "../Login";

describe("Test the login component", () => {
    test("render the login form with two button", async () => {
        render(<Login/>);
        const buttonList = await screen.findAllByRole("button");
        console.log(buttonList);
        expect(buttonList).toHaveLength(2);
    })
})
