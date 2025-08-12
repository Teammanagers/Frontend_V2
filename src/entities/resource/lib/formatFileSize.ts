// 바이트를 KB, MB 단위로 변환하는 함수
export const formatFileSize = (bytes: number) => {
  const KB = 1024;
  const MB = KB * KB;

  if (bytes < 0) return '0B';

  if (bytes < KB) return `${bytes}B`;
  else if (bytes < MB) return (bytes / KB).toFixed(1) + 'KB';
  return (bytes / MB).toFixed(1) + 'MB';
};
