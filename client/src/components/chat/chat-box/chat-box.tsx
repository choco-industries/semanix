import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

const ChatBox = () => {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const MAX_HEIGHT = 200;
  const MIN_HEIGHT = 72;
  const [height, setHeight] = useState(MIN_HEIGHT);

  useEffect(() => {
    handleHeight();
  }, []);

  const handleHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${MIN_HEIGHT}px`; // Reset to force recalculation
      const newHeight = Math.min(
        Math.max(textareaRef.current.scrollHeight, MIN_HEIGHT),
        MAX_HEIGHT,
      );
      console.log(height);
      setHeight(newHeight);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);

    // Calculate new height
    handleHeight();
  };

  const handleSend = () => {
    if (value.trim()) {
      console.log("Sending:", value);
      setValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="w-1/2 rounded-4xl p-2 pr-4">
      <motion.textarea
        ref={textareaRef}
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder="Type your message here."
        animate={{
          height: `${height}px`,
          overflowY: height >= MAX_HEIGHT ? "auto" : "hidden",
        }}
        transition={{ type: "tween", duration: 0.2 }}
        className={`placeholder:text-muted-foreground focus:ring-ring/50 h-[50px] w-[100%] resize-none rounded-md px-3 py-2 pr-20 pb-10 text-base shadow-xs focus:outline-none disabled:cursor-not-allowed disabled:opacity-50`}
      />

      {/* Buttons Container */}
      <div className="flex justify-end gap-2 pb-2 pl-2">
        <input
          type="file"
          id="attachment"
          className="hidden"
          onChange={(e) => console.log("Files:", e.target.files)}
        />
        {/* <Button
          variant="ghost"
          size="sm"
          type="button"
          className="text-muted-foreground h-8 w-8 p-0 hover:bg-transparent"
          onClick={() => document.getElementById("attachment")?.click()}
        >
        </Button> */}

        <Button
          size="sm"
          type="button"
          className="flex size-10 rounded-2xl disabled:cursor-not-allowed [&>svg]:mt-0.5"
          onClick={handleSend}
          disabled={!value.trim()}
        >
          <SendIcon />
        </Button>
      </div>
    </Card>
  );
};

export default ChatBox;
