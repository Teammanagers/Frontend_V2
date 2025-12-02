import { useState } from 'react';
import { downloadFile } from '@/shared/lib/utils/downloadFile';

export const useDownloadResource = () => {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const handleDownload = async (fileUrl: string, fileName: string) => {
    setIsDownloading(true);
    try {
      await downloadFile({ fileUrl, fileName });
    } catch (e) {
      alert(
        `파일 다운로드에 실패했습니다: ${e instanceof Error ? e.message : String(e)}`,
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return { handleDownload, isDownloading };
};
