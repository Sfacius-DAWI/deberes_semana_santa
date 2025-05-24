
async function APIcall() {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
  
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
  
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error('La petición tardó demasiado y fue cancelada.');
      } else {
        console.error('Fetch failed:', error);
      }
      throw error;
    }
}

export { APIcall };
