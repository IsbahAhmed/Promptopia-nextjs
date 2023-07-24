import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
  const { userId, prompt: post, tag } = await req.json();
  try {
    await connectToDB();
    const prompt = new Prompt({
      creator: userId,
      prompt: post,
      tag,
    });
    await prompt.save();

    return new Response(JSON.stringify(prompt), { status: 201 });
  } catch (e) {
    return new Response("Failed to create", { status: 500 });
  }
};
