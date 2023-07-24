import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt not found", { status: 400 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDB();
    const _prompt = await Prompt.findById(params.id);
    if (!_prompt) return new Response("prompt not found", { status: 400 });
    _prompt.tag = tag;
    _prompt.prompt = prompt;

    await _prompt.save();

    return new Response(JSON.stringify(_prompt), { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);

    return new Response("Deleted", { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};
