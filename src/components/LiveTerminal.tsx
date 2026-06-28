import React, { useState } from "react";
import { Terminal, Play, RotateCcw, FolderTree, FileJson, FileCode, CheckCircle, Flame, Server } from "lucide-react";

interface FileItem {
  name: string;
  lang: "typescript" | "python" | "json";
  content: string;
}

export default function LiveTerminal() {
  const files: Record<string, FileItem> = {
    "monira.ts": {
      name: "monira.ts",
      lang: "typescript",
      content: `// Monira Akter - Profile and Core Competencies 2026
const monira = {
  name: "Monira Akter",
  role: "CSE Programmer & Web Developer",
  education: {
    degree: "B.Sc. in CSE",
    institution: "Dhaka International University",
    cgpa: "3.90/4.00"
  },
  skills: [
    "JavaScript", "TypeScript", "React.JS", 
    "Node.JS", "YOLOv8", "TensorFlow"
  ],
  isAvailableForHire: true
};

function getStatus() {
  if (monira.isAvailableForHire) {
    return \`Ready to code! Contact: monira2002akter@gmail.com\`;
  }
}
console.log("Welcome to Monira OS v2.0.");
console.log(getStatus());`
    },
    "classification.py": {
      name: "classification.py",
      lang: "python",
      content: `# Guava Leaf Disease Detection using Deep Learning
import tensorflow as tf
import cv2
import numpy as np

class GuavaClassifier:
    def __init__(self):
        self.model_path = "./models/guava_yolov8_segmentation"
        self.classes = ["Healthy Leaf", "Guava Rust", "Algal Leaf Spot"]
        print("Initializing TensorFlow & OpenCV pipeline...")
        
    def detect_disease(self, image_stream):
        # Apply computer vision segmentation
        processed = cv2.GaussianBlur(image_stream, (5, 5), 0)
        print("Running bounding box crop & neural forward pass...")
        # Mock confidence scores based on Monira's CV validation
        scores = [0.05, 0.92, 0.03] 
        pred_idx = np.argmax(scores)
        return {
            "prediction": self.classes[pred_idx],
            "confidence": f"{scores[pred_idx] * 100:.2f}%",
            "status": "Infection detected. Treatment recommended."
        }

classifier = GuavaClassifier()
result = classifier.detect_disease("leaf_sample_04.jpg")
print(result)`
    },
    "portfolio.json": {
      name: "portfolio.json",
      lang: "json",
      content: `{
  "developer": "Monira Akter",
  "focus": "High performance fullstack applications & AI",
  "github": "https://github.com/monira2002",
  "location": "Dhaka, Bangladesh",
  "achievements": [
    "CGPA 3.90/4.00 ranking Top 3%",
    "Pioneered AI-based Guava disease segmentation thesis",
    "Pristine responsive design expert"
  ]
}`
    }
  };

  const [activeFile, setActiveFile] = useState<string>("monira.ts");
  const [editorContent, setEditorContent] = useState<string>(files["monira.ts"].content);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    "System connected securely to Monira's Local Repository.",
    "Type code above or choose from preset files.",
    "Click 'Run Script' or quick triggers below for immersive demos.",
  ]);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleSelectFile = (fileName: string) => {
    setActiveFile(fileName);
    setEditorContent(files[fileName].content);
  };

  const logMessage = (msg: string, delay = 0) => {
    if (delay === 0) {
      setConsoleLogs((prev) => [...prev, msg]);
    } else {
      setTimeout(() => {
        setConsoleLogs((prev) => [...prev, msg]);
      }, delay);
    }
  };

  const runCode = () => {
    setIsRunning(true);
    setConsoleLogs([]);
    logMessage("⚡ Compiling in cloud container environment...", 0);

    setTimeout(() => {
      // Simulate real output depending on selected file or user modifications
      if (activeFile === "monira.ts") {
        logMessage("[LOG] Welcome to Monira OS v2.0.", 300);
        
        let customStatus = "Ready to code! Contact: monira2002akter@gmail.com";
        // Check if user changed hire availability
        if (editorContent.includes("isAvailableForHire: false")) {
          customStatus = "Currently booked for projects. Ask for scheduling availability.";
        }
        
        logMessage(`[LOG] ${customStatus}`, 600);
        logMessage("✔ Process completed with exit code 0", 800);
      } else if (activeFile === "classification.py") {
        logMessage("[PY_LOG] Initializing TensorFlow & OpenCV pipeline...", 200);
        logMessage("[PY_LOG] Loading weights from './models/guava_yolov8_segmentation'...", 400);
        logMessage("[PY_LOG] Running bounding box crop & neural forward pass...", 600);
        logMessage(`[PY_RESULT] { 'prediction': 'Guava Rust', 'confidence': '92.00%', 'status': 'Infection detected. Treatment recommended.' }`, 800);
        logMessage("✔ Python script execution finished cleanly.", 1000);
      } else {
        // json
        try {
          const parsed = JSON.parse(editorContent);
          logMessage(`[JSON_OUT] Successfully parsed portfolio.json:`, 300);
          logMessage(`[JSON_OUT] Developer: ${parsed.developer || "Monira"}`, 500);
          logMessage(`[JSON_OUT] Github: ${parsed.github || "N/A"}`, 600);
          logMessage(`[JSON_OUT] Status: Verified JSON Object Core`, 700);
        } catch (e) {
          logMessage("❌ SyntaxError: Invalid JSON representation within file.", 350);
        }
      }
      setTimeout(() => setIsRunning(false), 1100);
    }, 400);
  };

  const handleReset = () => {
    setEditorContent(files[activeFile].content);
    setConsoleLogs(["Environment restored to pristine templates.", "Ready for live compilation."]);
  };

  // Quick Action triggers
  const executeApiCall = (action: "cv" | "guava" | "rank") => {
    setIsRunning(true);
    setConsoleLogs([]);
    
    if (action === "cv") {
      logMessage("🔍 querying monira_api.v1.getFullContactInfo()...", 0);
      logMessage("📡 DNS Resolved under Bangladesh Research Gateway", 200);
      logMessage("📥 Packet Payload Received (Size: 1.4kb):", 450);
      logMessage(`{
  "mobile": "+8801890350902",
  "email": "monira2002akter@gmail.com",
  "location": "Bhawar Vity, South Keraniganj, Dhaka",
  "status": "Actively seeking Programmer / Full-Stack opportunities"
}`, 750);
      logMessage("✔ Command ran successfully.", 900);
    } else if (action === "guava") {
      logMessage("🌿 Connecting to GuavaVision AI online API...", 0);
      logMessage("📂 Loading test image repository: './leaves/leaf_sample_04.jpg'", 200);
      logMessage("⚙ Running YOLOv8 segmentation inference mask...", 450);
      logMessage("📊 Detected Class Index: [1] - Guava Rust Infection Map.", 700);
      logMessage("🤖 Inference Time: 24.3ms under TensorRT engine.", 850);
      logMessage("🩹 Remediation Recommendation: Apply Copper Fungicide (organic spray twice weekly).", 1000);
      logMessage("✔ Simulation ended successfully.", 1100);
    } else {
      logMessage("🏆 Fetching Verified Academic Credentials...", 0);
      logMessage("🎓 Institution: Dhaka International University (DIU)", 200);
      logMessage("📈 Validated CGPA: 3.90 out of 4.00 scale", 400);
      logMessage("🎗 Class Standings: Top 3% of Graduating Cohort", 600);
      logMessage("💯 Board Approvals: HSC Milestone College (GPA 4.83), SSC Baghapur (GPA 4.83)", 800);
      logMessage("✔ Certification Check Verified.", 950);
    }

    setTimeout(() => setIsRunning(false), 1150);
  };

  return (
    <div className="w-full max-w-4xl mx-auto glass-pane rounded-2xl overflow-hidden shadow-2xl border border-peony/10 glow-peony transition-all duration-300">
      {/* OS Bar */}
      <div className="bg-currant/90 flex justify-between items-center px-4 py-3 border-b border-peony/20">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          <span className="text-xs font-mono text-blush/60 ml-2 font-medium tracking-wider select-none">
            monira-cloud-editor - bash
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center space-x-1.5 px-3 py-1 bg-peony hover:bg-peony-light text-blush rounded text-xs font-mono font-semibold transition-colors disabled:opacity-50"
            id="run-code-button"
          >
            <Play size={12} className={isRunning ? "animate-spin" : ""} />
            <span>{isRunning ? "RUNNING" : "RUN SCRIPT"}</span>
          </button>
          <button
            onClick={handleReset}
            className="p-1 text-blush/60 hover:text-peony hover:bg-currant-light rounded transition-colors"
            title="Reset File Content"
            id="reset-code-button"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 bg-currant text-blush font-mono h-[380px] md:h-[420px]">
        {/* Workspace Tree Panel */}
        <div className="md:col-span-1 bg-currant-dark/40 border-r border-peony/10 p-3 flex flex-col justify-between hidden md:flex text-xs">
          <div>
            <div className="flex items-center space-x-2 text-peony-light font-bold mb-4 opacity-95">
              <FolderTree size={14} />
              <span className="tracking-widest text-[10px]">WORKSPACE</span>
            </div>
            <div className="space-y-1">
              {Object.keys(files).map((name) => {
                const isActive = activeFile === name;
                return (
                  <button
                    key={name}
                    onClick={() => handleSelectFile(name)}
                    className={`w-full flex items-center space-x-2 px-2.5 py-1.5 rounded transition-all ${
                      isActive
                        ? "bg-peony/20 text-peony border-l-2 border-peony"
                        : "text-blush/70 hover:text-blush hover:bg-currant-light/30"
                    }`}
                  >
                    {files[name].lang === "json" ? (
                      <FileJson size={13} className="text-pink-400" />
                    ) : (
                      <FileCode size={13} className="text-peony" />
                    )}
                    <span className="truncate">{name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-currant/60 p-2.5 rounded border border-peony/10">
            <span className="text-[10px] text-dusty block uppercase tracking-wider mb-1 font-bold">API Status</span>
            <div className="flex items-center space-x-2 text-[11px] text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>DIU-VM ONLINE</span>
            </div>
          </div>
        </div>

        {/* Input/Editor Code Area */}
        <div className="col-span-1 md:col-span-3 flex flex-col h-full overflow-hidden">
          {/* File Picker Responsive Bar (Visible on mobile only) */}
          <div className="md:hidden flex items-center bg-currant-dark border-b border-peony/10 px-2 py-1.5 overflow-x-auto space-x-2 shrink-0">
            {Object.keys(files).map((name) => (
              <button
                key={name}
                onClick={() => handleSelectFile(name)}
                className={`flex items-center space-x-1 px-3 py-1 text-xs rounded-full shrink-0 ${
                  activeFile === name ? "bg-peony/20 text-peony" : "bg-currant/40 text-blush/70"
                }`}
              >
                <span>{name}</span>
              </button>
            ))}
          </div>

          {/* Core Text Editor Textarea */}
          <div className="flex-1 min-h-0 relative p-1.5 bg-currant-dark/20">
            <div className="absolute left-2 top-3 w-4 flex flex-col text-right pr-2 text-blush/30 text-[11px] leading-6 select-none font-sans pointer-events-none border-r border-peony/5">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <textarea
              value={editorContent}
              onChange={(e) => setEditorContent(e.target.value)}
              className="w-full h-full bg-transparent pl-8 pr-4 py-1.5 text-xs text-blush-dark leading-6 outline-none resize-none font-mono selection:bg-peony/30 selection:text-white"
              style={{ tabSize: 2 }}
              id="terminal-code-input"
            />
          </div>

          {/* Terminal Logs Output Panel */}
          <div className="h-36 md:h-44 border-t border-peony/20 bg-currant-dark p-3.5 overflow-y-auto flex flex-col shrink-0">
            <div className="flex items-center space-x-1.5 text-[10px] text-dusty uppercase font-semibold tracking-wider mb-2 select-none shrink-0">
              <Terminal size={12} className="text-peony" />
              <span>Interactive Output Log Console</span>
            </div>
            
            <div className="flex-1 space-y-1 font-mono text-[11px] overflow-y-auto select-text scrollbar-thin">
              {consoleLogs.map((log, index) => {
                const isError = log.startsWith("❌");
                const isSuccess = log.startsWith("✔") || log.startsWith("[PY_RESULT]");
                let colorClass = "text-blush/80";
                if (isError) colorClass = "text-red-400 font-semibold";
                if (isSuccess) colorClass = "text-emerald-300 font-semibold";
                if (log.startsWith("⚡") || log.startsWith("🔍") || log.startsWith("📡") || log.startsWith("🗂") || log.startsWith("🏆") || log.startsWith("🌿")) colorClass = "text-peony font-semibold glow-sm";

                return (
                  <div key={index} className={`${colorClass} whitespace-pre-wrap leading-relaxed`}>
                    {log}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Interactive Buttons (Immersive UI Demonstrations) */}
      <div className="bg-blush-card/10 border-t border-peony/15 px-4 py-3.5 md:flex md:items-center md:justify-between grid grid-cols-1 gap-2.5">
        <span className="text-[11px] font-mono text-currant/80 font-bold tracking-wide select-none">
          ⚡ QUICK DEMO ACTIONS:
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => executeApiCall("cv")}
            disabled={isRunning}
            className="px-2.5 py-1.5 bg-currant hover:bg-currant-light text-blush rounded text-[11px] font-mono flex items-center space-x-1.5 border border-peony/20 shadow-sm hover:border-peony/40 transition-all cursor-pointer"
            id="quiz-contact-trigger"
          >
            <CheckCircle size={10} className="text-peony" />
            <span>getProfileDetails()</span>
          </button>
          
          <button
            onClick={() => executeApiCall("guava")}
            disabled={isRunning}
            className="px-2.5 py-1.5 bg-currant hover:bg-currant-light text-blush rounded text-[11px] font-mono flex items-center space-x-1.5 border border-peony/20 shadow-sm hover:border-peony/40 transition-all cursor-pointer"
            id="quiz-classify-trigger"
          >
            <Server size={10} className="text-green-400 animate-pulse" />
            <span>simulateGuavaVision()</span>
          </button>

          <button
            onClick={() => executeApiCall("rank")}
            disabled={isRunning}
            className="px-2.5 py-1.5 bg-currant hover:bg-currant-light text-blush rounded text-[11px] font-mono flex items-center space-x-1.5 border border-peony/20 shadow-sm hover:border-peony/40 transition-all cursor-pointer"
            id="quiz-verify-trigger"
          >
            <Flame size={10} className="text-yellow-400" />
            <span>verifyDIUCredentials()</span>
          </button>
        </div>
      </div>
    </div>
  );
}
