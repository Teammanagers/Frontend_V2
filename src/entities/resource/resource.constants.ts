import PDFIcon from '@/shared/assets/resource/thumbnail-pdf.svg?react';
import WORDIcon from '@/shared/assets/resource/thumbnail-word.svg?react';
import CSVIcon from '@/shared/assets/resource/thumbnail-csv.svg?react';
import PPTIcon from '@/shared/assets/resource/thumbnail-ppt.svg?react';

/* 파일 확장자별 아이콘 매핑 */
export const EXTENSION_ICON_MAP = {
  // 이미지
  jpg: WORDIcon,
  jpeg: WORDIcon,
  png: WORDIcon,
  gif: WORDIcon,
  svg: WORDIcon,
  webp: WORDIcon,
  bmp: WORDIcon,
  heic: WORDIcon,

  // PDF
  pdf: PDFIcon,

  // Word 문서류
  doc: WORDIcon,
  docx: WORDIcon,
  hwp: WORDIcon,
  txt: WORDIcon,
  pages: WORDIcon,
  rtf: WORDIcon,

  // Presentation 문서류
  ppt: PPTIcon,
  pptx: PPTIcon,
  key: PPTIcon,

  // Spreadsheet 문서류
  csv: CSVIcon,
  xls: CSVIcon,
  xlsx: CSVIcon,

  // 코드 및 개발
  js: WORDIcon,
  ts: WORDIcon,
  jsx: WORDIcon,
  tsx: WORDIcon,
  html: WORDIcon,
  css: WORDIcon,
  scss: WORDIcon,
  json: WORDIcon,
  yaml: WORDIcon,
  yml: WORDIcon,
  md: WORDIcon,
  py: WORDIcon,
  java: WORDIcon,

  // 압축 파일
  zip: WORDIcon,
  rar: WORDIcon,
  '7z': WORDIcon,
  tar: WORDIcon,
  gz: WORDIcon,

  // 디자인 파일
  psd: WORDIcon,
  ai: WORDIcon,
  fig: WORDIcon,
  sketch: WORDIcon,
} as const;

export const DEFAULT_ICON = WORDIcon;

export type Extensions = keyof typeof EXTENSION_ICON_MAP;
