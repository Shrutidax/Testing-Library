import { fireEvent, getByTestId, render,screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login, { validateEmail } from "../Login";

describe("Test the login component", () => {
    test("render the login form with two button", async () => {
        render(<Login/>);
        const buttonList = await screen.findAllByRole("button");
        expect(buttonList).toHaveLength(2);
    })

    test("Should failed on email validation" , () => {
        const testMail = "abc.com"
        expect(validateEmail(testMail)).toBe(false);        
    })

    test("Should pass on email validation" , () => {
        const testMail = "abc@gmail.com"
        expect(validateEmail(testMail)).toBe(true);        
    })
    
    test("Email input field should accept email" , () => {
        render(<Login/>)
        const email = screen.getByPlaceholderText("Enter email")
        userEvent.type(email , "shrutisahu@gmail.com")
        expect(email.value).toMatch("shrutisahu@gmail.com");
    })

    test("Password input should be type password" , () => {
        render(<Login/>)
        const password = screen.getByPlaceholderText("Password");
        expect(password.type).toBe("password")
        expect(password).toHaveAttribute("type", "password")
    })

    test("Reset button should be able to reset the form" ,() => {
        const {getByTestId} = render(<Login/>)
        const resetBtn = getByTestId("reset")
        const email = screen.getByPlaceholderText("Enter email")
        const password = screen.getByPlaceholderText("Password")

        fireEvent.click(resetBtn)
        expect(email.value).toMatch("")
        expect(password.value).toMatch("")
    })

    test("Submit button should successfully submit the form" , () => {
        render(<Login/>)
        const submitBtn = screen.getByTestId("submit")
        const email = screen.getByPlaceholderText("Enter email")
        const password = screen.getByPlaceholderText("Password")

        userEvent.type(email ,"shruti@gmail.com")
        userEvent.type(password, "1234")
        userEvent.click(submitBtn);

        const info = screen.getByText("shruti@gmail.com")
        expect(info).toBeInTheDocument();
    })

    test("Should display error" , () => {
        render(<Login/>)
        const submitBtn = screen.getByTestId("submit")
        const email = screen.getByPlaceholderText("Enter email")
        const password = screen.getByPlaceholderText("Password")

        userEvent.type(email ,"shruti.com")
        userEvent.type(password, "1234")
        userEvent.click(submitBtn);

        const errorMessage = screen.getByText("Email is not valid")
        expect(errorMessage).toBeInTheDocument();
    })

})