export function getMemberIdFromToken() {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    const base64Payload = token.split('.')[1];
    const payload = JSON.parse(atob(base64Payload));
    return Number(payload.sub);
  } catch (e) {
    console.error('jwt 디코드 실패', e);
    return null;
  }
}
