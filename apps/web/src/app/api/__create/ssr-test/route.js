import { getToken } from '@auth/core/jwt';
import React from 'react';
import path from 'node:path';
import { renderToString } from 'react-dom/server';
import routes from '../../../routes';
import { serializeError } from 'serialize-error';
import cleanStack from 'clean-stack';

function serializeClean(err) {
	// if we want to clean this more, maybe we should look at the file where it
	// is imported and above.
	err.stack = cleanStack(err.stack, {
		pathFilter: (path) => {
			// Filter out paths that are not relevant to the error
			return (
				!path.includes('node_modules') &&
				!path.includes('dist') &&
				!path.includes('__create')
			);
		},
	});

	return serializeError(err);
}
const getHTMLOrError = (component) => {
	try {
		const html = renderToString(React.createElement(component, {}));
		return { html, error: null };
	} catch (error) {
		return { html: null, error: serializeClean(error) };
	}
};
import { GoogleGenerativeAI } from "@google/generative-ai";

// Get the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!messages) {
      return new Response(JSON.stringify({ error: "Messages are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // The last message is the user's prompt
    const lastMessage = messages[messages.length - 1];
    const prompt = lastMessage.content;
    
    // For simplicity, we'll just use the last prompt.
    // For a real conversation, you would build up the history.
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return new Response(JSON.stringify({ result: text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in Gemini API route:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
