import { motion } from 'motion/react';
import { 
  UploadCloud, 
  FileText, 
  Settings2, 
  Settings, 
  Languages,
  BookA,
  PlayCircle,
  FileImage,
  Loader2,
  CheckCircle2,
  Download
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';

export default function Translate() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'idle' | 'processing' | 'done'>('idle');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const simulateTranslation = () => {
    setIsTranslating(true);
    setStatus('processing');
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setIsTranslating(false);
          setStatus('done');
          return 100;
        }
        return p + Math.floor(Math.random() * 15) + 5;
      });
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Upload & Translate</h1>
        <p className="text-zinc-500 mt-1">Translate documents with perfect formatting preservation.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Upload Area */}
          <div 
            className={cn(
              "border-2 border-dashed rounded-2xl p-12 text-center transition-all relative overflow-hidden",
              dragActive ? "border-indigo-500 bg-indigo-50/50" : "border-zinc-300 bg-zinc-50 hover:border-zinc-400 hover:bg-zinc-100/50"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input 
              type="file" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
              onChange={(e) => e.target.files && setFile(e.target.files[0])}
            />
            {file ? (
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-white rounded-xl shadow-sm border border-zinc-200 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-indigo-600" />
                </div>
                <div>
                  <p className="text-zinc-900 font-medium font-medium">{file.name}</p>
                  <p className="text-zinc-500 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium underline mt-2 relative z-20" onClick={() => setFile(null)}>Remove file</button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-full shadow-sm border border-zinc-200 flex items-center justify-center">
                  <UploadCloud className="w-8 h-8 text-indigo-600" />
                </div>
                <div>
                  <p className="text-lg font-medium text-zinc-900">Drag & drop your file here</p>
                  <p className="text-sm text-zinc-500 mt-1">Supports DOCX, PDF, PPTX, XLSX up to 50MB</p>
                </div>
                <div className="flex items-center gap-4 mt-2 w-64">
                  <div className="h-px bg-zinc-300 flex-1"></div>
                  <span className="text-xs text-zinc-400 uppercase font-medium">or</span>
                  <div className="h-px bg-zinc-300 flex-1"></div>
                </div>
                <span className="bg-white border border-zinc-200 shadow-sm text-sm font-medium px-4 py-2 rounded-lg text-zinc-700">Browse Files</span>
              </div>
            )}
          </div>

          {/* Progress / Status */}
          {status !== 'idle' && (
            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
               <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-zinc-900 flex items-center gap-2">
                  {status === 'processing' ? <Loader2 className="w-5 h-5 animate-spin text-indigo-600" /> : <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                  {status === 'processing' ? 'Translating Document...' : 'Translation Complete'}
                </h3>
                <span className="text-sm font-medium text-zinc-500">{progress}%</span>
              </div>
              <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                <motion.div 
                  className={cn("h-full rounded-full transition-colors", status === 'done' ? 'bg-emerald-500' : 'bg-indigo-600')} 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
              {status === 'processing' && (
                <div className="mt-4 bg-zinc-900 rounded-lg p-3 text-xs font-mono text-emerald-400 h-32 overflow-y-auto">
                  <p>{'>'} Analyzing document structure...</p>
                  {progress > 10 && <p>{'>'} Extracting text blocks and tables...</p>}
                  {progress > 30 && <p>{'>'} Translating content (auto-detect to French)...</p>}
                  {progress > 60 && <p>{'>'} Preserving typography and layout constraints...</p>}
                  {progress > 85 && <p>{'>'} Recompiling final document...</p>}
                </div>
              )}
              {status === 'done' && (
                <div className="mt-6 flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition">
                    <Download className="w-4 h-4" />
                    Download File
                  </button>
                  <button onClick={() => { setStatus('idle'); setProgress(0); setFile(null); }} className="px-4 py-2.5 rounded-lg font-medium text-zinc-700 bg-white border border-zinc-200 hover:bg-zinc-50 transition">
                    Translate Another
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm space-y-5">
            <h3 className="font-semibold text-zinc-900 flex items-center gap-2 mb-2">
              <Languages className="w-4 h-4 text-zinc-500" />
              Language Pair
            </h3>
            <div className="space-y-1">
              <label className="text-sm font-medium text-zinc-700 mb-1 block">Source</label>
              <select className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition">
                <option>Auto-detect (Recommended)</option>
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-zinc-700 mb-1 block">Target</label>
              <select className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition">
                <option>French</option>
                <option>Spanish</option>
                <option>German</option>
                <option>Japanese</option>
              </select>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-zinc-900 flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-zinc-500" />
              Translation Options
            </h3>
            
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-start mt-0.5">
                  <input type="checkbox" className="peer sr-only" defaultChecked />
                  <div className="w-4 h-4 border-2 border-zinc-300 rounded peer-checked:bg-indigo-600 peer-checked:border-indigo-600"></div>
                  <CheckCircle2 className="w-3 h-3 text-white absolute top-0.5 left-0.5 opacity-0 peer-checked:opacity-100" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-900 group-hover:text-indigo-600 transition">Preserve Formatting</p>
                  <p className="text-xs text-zinc-500">Keep exact layout, tables, and styles</p>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-start mt-0.5">
                  <input type="checkbox" className="peer sr-only" />
                  <div className="w-4 h-4 border-2 border-zinc-300 rounded peer-checked:bg-indigo-600 peer-checked:border-indigo-600"></div>
                  <CheckCircle2 className="w-3 h-3 text-white absolute top-0.5 left-0.5 opacity-0 peer-checked:opacity-100" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-900 group-hover:text-indigo-600 transition">Enable OCR (Images)</p>
                  <p className="text-xs text-zinc-500">Extracts text from embedded images</p>
                </div>
              </label>
            </div>

            <div className="pt-2 border-t border-zinc-100">
               <label className="text-sm font-medium text-zinc-700 mb-2 block">Apply Glossary</label>
                <select className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition">
                  <option>None</option>
                  <option>Medical Terms v2</option>
                  <option>Legal Standard</option>
                </select>
            </div>
          </div>

          <button 
            disabled={!file || status === 'processing'}
            onClick={simulateTranslation}
            className={cn(
              "w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold shadow-sm transition-all",
              !file || status === 'processing' ? "bg-zinc-100 text-zinc-400 cursor-not-allowed" : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md hover:-translate-y-0.5"
            )}
          >
            <PlayCircle className="w-5 h-5" />
            Start Translation
          </button>
        </div>
      </div>
    </motion.div>
  );
}
