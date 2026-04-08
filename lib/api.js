export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUploadUrl = async () => {
  const res = await fetch(`${API_URL}/upload`);
  return res.json();
};

export const analyzeResumeApi = async (payload) => {
  const res = await fetch(`${API_URL}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return res.json();
};