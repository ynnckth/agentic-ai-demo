"use client";

import "@copilotkit/react-ui/styles.css";
import { CopilotChat } from "@copilotkit/react-ui";
import { useCopilotAction } from "@copilotkit/react-core"
import { useRef, useState } from "react";


export default function Home() {

  const resolverRef = useRef<((value: string) => void) | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [secret, setSecret] = useState<string>("");

  useCopilotAction({
    name: "getSecret",
    description: "Get a secret from the user",
    available: "remote", // optional, makes it so the action is *only* available to the agent
    parameters: [
      {
        name: "name",
        type: "string",
        description: "The name of the user to get the secret from",
        required: true,
      },
    ],
    handler: async ({ name }) => {
      setPrompt(`Please provide your secret, ${name}`);
      return await new Promise<string>((resolve) => {
        resolverRef.current = resolve;
      });
    },
  });

  const submitSecret = () => {
    if (resolverRef.current) {
      resolverRef.current(secret);
      resolverRef.current = null;
    }
  }

  return (
    <div>
      <div>
        {prompt !== "" && (
          <>
            {prompt}:
            <input type="text" placeholder="Enter your secret" value={secret} onChange={(e) => setSecret(e.target.value)} />
            <button onClick={submitSecret}>Submit Secret</button>
          </>
        )}
      </div>
      <div>
        <CopilotChat
          labels={{
            title: "Your Assistant",
          }}
        />
      </div>
    </div>
  );
}
