import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import PromptCard from "../PromptCard";

// Mock clipboard API
const mockWriteText = jest.fn();
Object.assign(navigator, {
  clipboard: {
    writeText: mockWriteText,
  },
});

describe("PromptCard", () => {
  const testPrompt = "Explain quantum computing in simple terms.";

  beforeEach(() => {
    mockWriteText.mockClear();
    mockWriteText.mockResolvedValue(undefined);
  });

  it("renders prompt text correctly", () => {
    render(<PromptCard prompt={testPrompt} />);

    expect(screen.getByText(testPrompt)).toBeInTheDocument();
  });

  it("displays copy button initially", () => {
    render(<PromptCard prompt={testPrompt} />);

    expect(screen.getByText("Copy")).toBeInTheDocument();
  });

  it("copies text to clipboard when copy button is clicked", async () => {
    render(<PromptCard prompt={testPrompt} />);

    const copyButton = screen.getByText("Copy");
    fireEvent.click(copyButton);

    expect(mockWriteText).toHaveBeenCalledWith(testPrompt);
  });

  it("shows success feedback after copying", async () => {
    render(<PromptCard prompt={testPrompt} />);

    const copyButton = screen.getByText("Copy");
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(screen.getByText("Copied!")).toBeInTheDocument();
    });
  });

  it("resets to copy button after 2 seconds", async () => {
    jest.useFakeTimers();
    render(<PromptCard prompt={testPrompt} />);

    const copyButton = screen.getByText("Copy");
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(screen.getByText("Copied!")).toBeInTheDocument();
    });

    // Fast-forward time by 2 seconds
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(screen.getByText("Copy")).toBeInTheDocument();
    });

    jest.useRealTimers();
  });

  it("handles clipboard API errors gracefully", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    mockWriteText.mockRejectedValue(new Error("Clipboard API failed"));

    render(<PromptCard prompt={testPrompt} />);

    const copyButton = screen.getByText("Copy");
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to copy text: ",
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });
});
