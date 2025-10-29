// src/utils/color.ts

/**
 * 두 16진수 색상 사이를 보간합니다.
 * @param color1 시작 색상 (e.g., '#f0f0f0')
 * @param color2 끝 색상 (e.g., '#48bb78')
 * @param factor 혼합 비율 (0 to 1)
 * @returns {string} 계산된 16진수 색상 코드
 */
export const interpolateColor = (color1: string, color2: string, factor: number): string => {
  // factor를 0과 1 사이로 제한
  const t = Math.max(0, Math.min(1, factor));

  // 16진수 색상을 R, G, B 값으로 변환
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 }; // 변환 실패 시 검은색 반환
  };

  // R, G, B 값을 16진수 색상으로 변환
  const rgbToHex = (r: number, g: number, b: number): string =>
    '#' + [r, g, b].map(x => {
      const hex = Math.round(x).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');

  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);

  // 각 채널(R, G, B)별로 선형 보간
  const r = c1.r + t * (c2.r - c1.r);
  const g = c1.g + t * (c2.g - c1.g);
  const b = c1.b + t * (c2.b - c1.b);

  return rgbToHex(r, g, b);
};