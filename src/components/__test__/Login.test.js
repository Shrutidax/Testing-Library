import { render,screen } from "@testing-library/react";
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
        userEvent.type(email , "shrutisahu")
        expect(email.value).toMatch("shrutisahu@gmail.com");
    })

    test("Password input should be type password" , () => {
        render(<Login/>)
        const password = screen.getByPlaceholderText("Password");
        expect(password.type).toBe("password")
        expect(password).toHaveAttribute("type", "password")
    })
})
