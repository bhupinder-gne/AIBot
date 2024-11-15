import { TabEnum } from "@/models";
import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages, prompt, activeTab, numberOfImages } = await req.json();

    if (activeTab === TabEnum.Image) {
      if (!prompt) {
        return NextResponse.json(
          { error: "Prompt is required" },
          { status: 400 }
        );
      }

      try {
        const response = await openai.images.generate({
          model: "dall-e-2",
          prompt: prompt,
          n: numberOfImages,
          size: "512x512",
          response_format: "b64_json",
        });

        return NextResponse.json(response);
      } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 });
      }
    } else if (activeTab === TabEnum.Text) {
      if (!messages) {
        return NextResponse.json(
          { error: "Prompt is required" },
          { status: 400 }
        );
      }

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4",
            messages,
          }),
        }
      );

      const data = await response.json();
      return NextResponse.json(data);
    }
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch response from OpenAI: ${error}` },
      { status: 500 }
    );
  }
}
