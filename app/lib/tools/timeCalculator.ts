/**
 * 時間計算工具
 * 支援 HH:MM 格式的時間解析和加總
 */

/**
 * 解析時間字符串 (HH:MM 或 H 格式) 為十進制小時
 * @param timeStr - 時間字符串，如 "7:46"（7小時46分鐘）或 "0"（0小時）
 * @returns 十進制小時數
 */
export function parseTime(timeStr: string): number {
  // 處理空字符串
  if (!timeStr || typeof timeStr !== "string" || timeStr.trim() === "") {
    return 0;
  }

  timeStr = timeStr.trim();

  // 處理單個數字（如 "0", "5" 等，表示小時數）
  if (!timeStr.includes(":")) {
    const num = parseInt(timeStr, 10);
    if (!isNaN(num) && num >= 0) {
      return num;
    }
    return 0;
  }

  // 處理 HH:MM 格式
  const parts = timeStr.split(":");
  if (parts.length !== 2) {
    return 0;
  }

  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);

  if (isNaN(hours) || isNaN(minutes)) {
    return 0;
  }

  // 轉換為十進制小時: 小時 + (分鐘 / 60)
  return hours + minutes / 60;
}

/**
 * 從字符串陣列計算總小時數
 * @param lines - 時間字符串陣列
 * @returns 總小時數（十進制）
 */
export function calculateTotalHours(lines: string[]): number {
  if (!Array.isArray(lines)) {
    return 0;
  }

  return lines.reduce((total, line) => {
    return total + parseTime(line);
  }, 0);
}

/**
 * 將十進制小時格式化為 "X 小時 Y 分鐘" 格式
 * @param hours - 十進制小時數
 * @returns 格式化字符串，如 "13 小時 31 分鐘"
 */
export function formatHoursAndMinutes(hours: number): string {
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);

  if (wholeHours === 0) {
    return `${minutes} 分鐘`;
  }

  if (minutes === 0) {
    return `${wholeHours} 小時`;
  }

  return `${wholeHours} 小時 ${minutes} 分鐘`;
}

/**
 * 計算時間加總（主要功能）
 * @param input - 用戶輸入的時間字符串（用換行符分隔）
 * @returns 格式化的加總結果
 */
export function calculateTimeTotal(input: string): string {
  const lines = input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const totalHours = calculateTotalHours(lines);
  return formatHoursAndMinutes(totalHours);
}

/**
 * 驗證輸入是否有效
 * @param input - 用戶輸入
 * @returns 驗證結果
 */
export function validateInput(
  input: string
): { isValid: boolean; error?: string; hasInvalidChars?: boolean } {
  if (!input || input.trim().length === 0) {
    return { isValid: false, error: "請輸入時間資料" };
  }

  const lines = input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length === 0) {
    return { isValid: false, error: "沒有有效的時間格式" };
  }

  // 檢查是否有無效的字元
  // 接受格式：HH:MM 或單個數字（如 0, 5, 10 等）
  const validLineRegex = /^(\d+)(?::(\d+))?$/;
  const invalidLines = lines.filter((line) => !validLineRegex.test(line));

  if (invalidLines.length > 0) {
    return {
      isValid: false,
      error: `包含無效格式：${invalidLines.slice(0, 2).join(", ")}${invalidLines.length > 2 ? "..." : ""}`,
      hasInvalidChars: true,
    };
  }

  // 格式已驗證通過，所有行都是有效格式
  return { isValid: true };
}

/**
 * 檢查輸入是否可以計算（實時驗證）
 * @param input - 用戶輸入
 * @returns 是否可以計算
 */
export function canCalculate(input: string): boolean {
  if (!input || input.trim().length === 0) {
    return false;
  }

  const validation = validateInput(input);
  return validation.isValid;
}
