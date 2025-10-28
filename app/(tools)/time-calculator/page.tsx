"use client";

import { useState, useMemo } from "react";
import { Card, CardBody, CardHeader, CardFooter } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import {
  calculateTimeTotal,
  validateInput,
  canCalculate,
} from "../../lib/tools/timeCalculator";

export default function TimeCalculatorPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [history, setHistory] = useState<Array<{ input: string; result: string }>>([]);

  // 實時驗證輸入
  const validation = useMemo(() => {
    if (!input.trim()) {
      return { isValid: false, error: "" };
    }
    return validateInput(input);
  }, [input]);

  const isCalculateDisabled = !canCalculate(input);

  const handleInputChange = (value: string) => {
    setInput(value);
    // 當輸入改變時，清除之前的結果和錯誤
    setResult("");
  };

  const handleCalculate = () => {
    setError("");

    const validation = validateInput(input);
    if (!validation.isValid) {
      setError(validation.error || "輸入無效");
      setResult("");
      return;
    }

    try {
      const total = calculateTimeTotal(input);
      setResult(total);
      setError("");

      // 添加到歷史紀錄
      setHistory((prev) => [...prev, { input, result: total }]);
    } catch (err) {
      setError("計算出錯，請檢查輸入格式");
      setResult("");
    }
  };

  const handleClear = () => {
    setInput("");
    setResult("");
    setError("");
  };

  const handleCopyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
    }
  };

  const handleLoadHistory = (item: { input: string; result: string }) => {
    setInput(item.input);
    setResult(item.result);
    setError("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-card-bg border-b-2 border-border py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <span className="text-4xl">⏱️</span>
            時間加總計算機
          </h1>
          <p className="text-foreground/60">
            輸入多個時間（HH:MM 格式），自動計算總時長
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Panel */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-bold">輸入時間</h2>
                <p className="text-sm text-foreground/60 mt-1">
                  每行輸入一個時間，格式: HH:MM (例: 7:46, 8:30)
                </p>
              </CardHeader>

              <CardBody>
                <textarea
                  value={input}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder="7:46&#10;8:30&#10;5:15&#10;..."
                  className={`w-full h-48 p-4 bg-background border-2 rounded-lg text-foreground placeholder-foreground/40 font-mono focus:outline-none focus:ring-1 resize-none transition-colors ${
                    !input.trim()
                      ? "border-border focus:border-primary focus:ring-primary/50"
                      : validation.isValid
                      ? "border-primary focus:border-primary focus:ring-primary/50"
                      : "border-secondary focus:border-secondary focus:ring-secondary/50"
                  }`}
                />

                {input.trim() && !validation.isValid && (
                  <div className="mt-4 p-3 bg-secondary/20 border-l-4 border-secondary text-secondary rounded text-sm">
                    ⚠️ {validation.error}
                  </div>
                )}

                {input.trim() && validation.isValid && !result && (
                  <div className="mt-4 p-3 bg-primary/20 border-l-4 border-primary text-primary rounded text-sm">
                    ✓ 格式正確，可以計算
                  </div>
                )}

                {error && (
                  <div className="mt-4 p-3 bg-secondary/20 border-l-4 border-secondary text-secondary rounded text-sm">
                    ⚠️ {error}
                  </div>
                )}

                {result && (
                  <div className="mt-4 p-4 bg-primary/10 border-2 border-primary rounded-lg">
                    <p className="text-sm text-foreground/70 mb-2">計算結果：</p>
                    <p className="text-2xl font-bold text-primary">{result}</p>
                  </div>
                )}
              </CardBody>

              <CardFooter>
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={handleCalculate}
                  disabled={isCalculateDisabled}
                >
                  計算
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleClear}
                >
                  清空
                </Button>
                {result && (
                  <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={handleCopyResult}
                  >
                    複製結果
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>

          {/* Info & History Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Info Card */}
            <Card bordered={false} hoverEffect={false}>
              <CardBody>
                <h3 className="font-bold text-lg mb-4 text-primary">💡 使用說明</h3>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li>✓ 每行輸入一個時間</li>
                  <li>✓ 格式必須是 HH:MM</li>
                  <li>✓ 自動計算總和</li>
                  <li>✓ 支援複製結果</li>
                  <li>✓ 查看計算歷史</li>
                </ul>
              </CardBody>
            </Card>

            {/* History Card */}
            {history.length > 0 && (
              <Card bordered={false} hoverEffect={false}>
                <CardBody>
                  <h3 className="font-bold text-lg mb-4 text-accent">📋 計算歷史</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {history.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleLoadHistory(item)}
                        className="p-2 bg-background/50 border border-border rounded cursor-pointer hover:border-accent hover:bg-background/80 transition-all"
                      >
                        <p className="text-xs text-foreground/60 truncate">
                          {item.input.split("\n").length} 項
                        </p>
                        <p className="text-sm font-bold text-foreground">
                          {item.result}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            )}
          </div>
        </div>

        {/* Examples Section */}
        <Card className="mt-8" bordered={false} hoverEffect={false}>
          <CardBody>
            <h3 className="font-bold text-lg mb-4">📝 輸入範例</h3>
            <div className="bg-background/50 p-4 rounded-lg font-mono text-sm border border-border">
              <p className="text-foreground/80">7:46</p>
              <p className="text-foreground/80">8:30</p>
              <p className="text-foreground/80">5:15</p>
              <p className="text-foreground/80">2:05</p>
              <p className="text-primary font-bold mt-3">↓ 計算結果 ↓</p>
              <p className="text-primary font-bold">23 小時 36 分鐘</p>
            </div>
          </CardBody>
        </Card>
      </main>
    </div>
  );
}
