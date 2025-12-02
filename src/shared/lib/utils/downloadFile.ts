interface DownloadFileParams {
  fileUrl: string;
  fileName: string;
}

/**
 * 파일 다운로드 유틸 함수
 * @param fileUrl - 다운로드할 파일의 URL
 * @param fileName - 저장할 파일 이름
 * @throws {Error} 파일 다운로드 실패 시 에러를 던집니다.
 * @example
 * await downloadFile({
 * fileUrl: 'https://example.com/file.pdf',
 * fileName: 'document.pdf',
 * });
 */
export const downloadFile = async ({
  fileUrl,
  fileName,
}: DownloadFileParams) => {
  if (!fileUrl) throw new Error('파일을 URL이 존재하지 않습니다.');

  try {
    const res = await fetch(fileUrl);

    if (!res.ok) throw new Error(`${res.statusText}`);

    const blob = await res.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error(`파일 다운로드 중 오류가 발생했습니다. ${err}`);
    throw err;
  }
};
