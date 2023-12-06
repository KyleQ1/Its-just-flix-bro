import Review from "../src/components/Review.js"

test("renders the empty review form correctly", () => {
    render(<Review />);

    expect(screen.getByText("Submit")).toBeInTheDocument();
})