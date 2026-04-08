"use client";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { uploadResume } from "../store/uploadSlice";
import { analyzeResume } from "../store/analysisSlice";

export default function Home() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");

  const dispatch = useDispatch();

  const upload = useSelector((state) => state.upload);
  const analysis = useSelector((state) => state.analysis);

  const handleUpload = () => {
    if (!file) return;
    dispatch(uploadResume(file));
  };

  const handleAnalyze = () => {
    if (!upload.fileKey) return;

    dispatch(
      analyzeResume({
        fileKey: upload.fileKey,
        jobDescription,
      })
    );
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h1>AI Resume Analyzer 🚀</h1>

      {/* Upload */}
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Upload</button>

      <p>Upload Status: {upload.status}</p>

      {/* Job Description */}
      <textarea
        placeholder="Paste job description..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        style={{ width: "100%", height: "100px" }}
      />

      <button onClick={handleAnalyze}>Analyze</button>

      <p>Analysis Status: {analysis.status}</p>

      {/* Results */}
      {analysis.result && (
        <div>
          <h3>Results:</h3>
          <pre>{JSON.stringify(analysis.result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}