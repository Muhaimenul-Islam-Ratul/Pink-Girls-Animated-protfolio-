import React, { useState } from "react";
import { Sparkles, CheckCircle2, ShieldAlert, Cpu, Heart, Info, ArrowRight } from "lucide-react";

interface LeafSample {
  id: string;
  name: string;
  status: "Healthy" | "Guava Rust" | "Algal Leaf Spot";
  confidence: number;
  description: string;
  remediation: string;
  svgColor: string;
  spots: { cx: number; cy: number; r: number; color: string }[];
}

export default function GuavaClassifier() {
  const samples: LeafSample[] = [
    {
      id: "leaf-01",
      name: "Mild Rust Sample",
      status: "Guava Rust",
      confidence: 94.62,
      description: "Severe brown-orange rust patches visible on the leaf underside, caused by Puccinia psidii fungal strains.",
      remediation: "Apply dynamic copper-based fungicides. Remove heavily infected falling foliage immediately and clean base soil.",
      svgColor: "fill-emerald-800",
      spots: [
        { cx: 70, cy: 90, r: 12, color: "fill-amber-600/70" },
        { cx: 85, cy: 110, r: 8, color: "fill-amber-700/80" },
        { cx: 120, cy: 75, r: 15, color: "fill-amber-600/70" },
        { cx: 150, cy: 110, r: 10, color: "fill-amber-700/70" },
      ],
    },
    {
      id: "leaf-02",
      name: "Pristine Leaf Sample",
      status: "Healthy",
      confidence: 98.75,
      description: "Shiny emerald foliage with complete cell membrane symmetry and absence of fungal or algal lesions.",
      remediation: "No treatment required. Ensure adequate spacing, watering, and nitrogen-rich soil nutrition to maintain strong defenses.",
      svgColor: "fill-emerald-600",
      spots: [],
    },
    {
      id: "leaf-03",
      name: "Algal Leaf Lesion",
      status: "Algal Leaf Spot",
      confidence: 91.14,
      description: "Rusty orange velvety circles or light gray blotches, common in damp agricultural climates.",
      remediation: "Improve tree ventilation, prune dense clusters to allow morning light penetration, and mist with potassium bicarbonate.",
      svgColor: "fill-emerald-700",
      spots: [
        { cx: 65, cy: 110, r: 18, color: "fill-rose-700/60" },
        { cx: 140, cy: 80, r: 14, color: "fill-rose-800/60" },
        { cx: 110, cy: 115, r: 12, color: "fill-rose-700/50" },
      ],
    },
  ];

  const [activeSampleId, setActiveSampleId] = useState<string>("leaf-01");
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanComplete, setScanComplete] = useState<boolean>(true);
  const [showMesh, setShowMesh] = useState<boolean>(true);

  const activeSample = samples.find((s) => s.id === activeSampleId) || samples[0];

  const handleRunScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 2200);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-blush-card rounded-2xl p-6 md:p-8 border border-peony/10 shadow-xl">
      {/* Block Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-peony/15 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-peony font-mono text-xs font-bold tracking-wider uppercase mb-1">
            <Cpu size={14} className="animate-spin" style={{ animationDuration: "8s" }} />
            <span>Undergrad Thesis Live Interactive Sandbox</span>
          </div>
          <h3 className="font-serif text-2xl md:text-3xl text-currant font-bold tracking-tight">
            Guava Disease Bounding & AI Segmentation Modeler
          </h3>
        </div>
        <div className="flex shrink-0 space-x-2.5">
          {samples.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setActiveSampleId(s.id);
                setScanComplete(true);
              }}
              className={`px-3 py-1.5 text-xs rounded-full font-mono font-medium transition-all ${
                activeSampleId === s.id
                  ? "bg-peony text-blush shadow-md"
                  : "bg-currant/5 text-currant hover:bg-currant/10"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Leaf Graphic Display */}
        <div className="relative aspect-square max-w-[340px] mx-auto w-full bg-currant rounded-2xl flex items-center justify-center p-6 border-2 border-peony/15 overflow-hidden shadow-inner group">
          {/* Diagnostic sweeping line */}
          {isScanning && (
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-peony to-transparent animate-[bounce_2s_infinite] shadow-[0_0_15px_rgba(255,46,147,0.8)] z-30" />
          )}

          {/* Sci fi diagnostic grid overlay */}
          {showMesh && (
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,46,147,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,46,147,0.04)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
          )}

          {/* Abstract leaf shape svg */}
          <div className="relative w-48 h-48 flex items-center justify-center transition-all duration-500 scale-100 group-hover:scale-105">
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]">
              {/* Stem */}
              <path d="M100,10 L100,195" stroke="#4a2e1d" strokeWidth="4" strokeLinecap="round" />
              
              {/* Main Leaf Plate */}
              <path
                d="M100,15 C10,50 10,150 100,185 C190,150 190,50 100,15 Z"
                className={`${activeSample.svgColor} transition-all duration-700`}
              />

              {/* Leaf Veins */}
              <path
                d="M100,45 Q60,65 30,55 M100,45 Q140,65 170,55 M100,80 Q50,105 20,100 M100,80 Q150,105 180,100 M100,120 Q55,145 25,145 M100,120 Q145,145 175,145 M100,160 Q65,180 40,185 M100,160 Q135,180 160,185"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />

              {/* Disease spot overlays */}
              {scanComplete &&
                activeSample.spots.map((spot, idx) => (
                  <circle
                    key={idx}
                    cx={spot.cx}
                    cy={spot.cy}
                    r={spot.r}
                    className={`${spot.color} animate-pulse`}
                    style={{ animationDuration: `${idx * 1.5 + 2}s` }}
                  />
                ))}

              {/* Computer Vision Deep Learning Target Crop Box */}
              {scanComplete && activeSample.status !== "Healthy" && (
                <rect
                  x="40"
                  y="50"
                  width="120"
                  height="100"
                  rx="6"
                  stroke="#ff2e93"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  fill="none"
                  className="animate-pulse"
                />
              )}
            </svg>

            {/* Neural label bounding prompt */}
            {scanComplete && (
              <div className="absolute -top-1 left-1.5 bg-peony text-white px-2 py-0.5 rounded text-[10px] font-mono tracking-wider font-bold shadow animate-bounce">
                {activeSample.status !== "Healthy" ? "INFF_VAL" : "NORMAL_VAL"}
              </div>
            )}
          </div>

          {/* Mesh Toggle Switcher */}
          <button
            onClick={() => setShowMesh(!showMesh)}
            className="absolute bottom-3 right-3 text-[10px] font-mono text-blush/60 hover:text-peony transition-all bg-currant-dark/80 px-2 py-1 rounded"
          >
            {showMesh ? "HIDE_GRID" : "SHOW_GRID"}
          </button>
        </div>

        {/* Diagnosis result list */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center space-x-2.5 mb-2.5">
              {activeSample.status === "Healthy" ? (
                <div className="flex items-center space-x-1 px-3 py-1 bg-emerald-950/40 text-emerald-300 rounded-full border border-emerald-500/30 text-xs font-mono font-bold">
                  <CheckCircle2 size={13} />
                  <span>Healthy Standard</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1 px-3 py-1 bg-rose-950/40 text-peony-light rounded-full border border-peony/30 text-xs font-mono font-bold">
                  <ShieldAlert size={13} className="animate-bounce" />
                  <span>{activeSample.status}</span>
                </div>
              )}
              <span className="text-xs text-dusty font-mono font-medium">Confidence Score</span>
            </div>

            {/* Progress bar graph */}
            <div className="mb-4">
              <div className="flex justify-between items-end text-xs font-mono text-currant font-bold mb-1.5">
                <span>YOLOv8 Segmentation accuracy</span>
                <span className="text-peony font-extrabold">{activeSample.confidence}%</span>
              </div>
              <div className="w-full bg-currant/10 h-3 rounded-full overflow-hidden border border-peony/10">
                <div
                  className="bg-peony h-full rounded-full transition-all duration-1000"
                  style={{ width: isScanning ? "0%" : `${activeSample.confidence}%` }}
                />
              </div>
            </div>

            <p className="text-sm font-sans text-currant/80 leading-relaxed mb-4 italic">
              "{activeSample.description}"
            </p>

            <div className="bg-currant/5 p-4 rounded-xl border border-peony/5 mb-5">
              <div className="flex items-start space-x-2">
                <Info size={16} className="text-peony shrink-0 mt-0.5" />
                <div className="text-xs font-mono">
                  <span className="text-currant font-bold block mb-1">REMEDIATION DIRECTIONS</span>
                  <span className="text-currant/70 leading-relaxed">{activeSample.remediation}</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleRunScan}
            disabled={isScanning}
            className="w-full py-3 bg-currant hover:bg-currant-light text-blush rounded-xl text-xs font-mono font-bold border border-peony/20 flex items-center justify-center space-x-2 group-hover:scale-105 shadow transition-all cursor-pointer disabled:opacity-50"
            id="run-guava-prediction"
          >
            <Sparkles size={14} className={isScanning ? "animate-spin text-peony" : "text-peony-light"} />
            <span>{isScanning ? "PROCESSING NEURAL MAP..." : "RUN INFERENCE CLASSIFIER"}</span>
            <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
