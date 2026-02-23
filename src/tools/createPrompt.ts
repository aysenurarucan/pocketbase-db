import { Tool } from "@modelcontextprotocol/sdk/types.js"; // Wait, checking SDK structure
// The SDK structure might be different. Let's assume the user wants the implementation logic here, and we import it in server.ts.
// But actually, we define the tool definition and the handler.

/*
  MCP Tool structure:
  {
    name: "toolName",
    description: "...",
    inputSchema: JSONSchema
  }
*/

import { z } from "zod";
import { CreatePromptSchema } from "../schemas/prompts.js";
import { pbService } from "../services/pocketbaseService.js";

// We'll export a definition object and a handler function
export const createPromptTool = {
    name: "createPrompt",
    description: "Create and store a new image generation prompt in the database",
    inputSchema: {
        type: "object",
        properties: {
            title: { type: "string" },
            content: { type: "string" },
            negativePrompt: { type: "string" },
            tags: { type: "array", items: { type: "string" } },
            category: { type: "string" }
        },
        required: ["title", "content"]
    },
    handler: async (args: any) => {
        // Validate with Zod
        const validated = CreatePromptSchema.parse(args);
        const result = await pbService.createPrompt(validated);
        return {
            content: [
                {
                    type: "text",
                    text: `Prompt created successfully with ID: ${result.id}`
                }
            ]
        };
    }
};
