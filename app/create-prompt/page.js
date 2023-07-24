"use client";

import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const createPost = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      console.log(session.user);
      const response = await fetch("/api/prompt/new", {
        method: "post",
        body: JSON.stringify({
          ...post,
          userId: session.user.id,
        }),
      });

      if (response.ok) router.push("/");
    } catch (e) {
      console.log(e);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPost}
    />
  );
};

export default CreatePrompt;
