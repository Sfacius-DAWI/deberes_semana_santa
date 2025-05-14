export const peopleCall = async() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
  
    try {
      const response = await fetch('https://www.swapi.tech/api/people/1', {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data);
  
    } catch (error) {

      if (error.name === 'AbortError') {
        console.error('La petición tardó demasiado y fue cancelada.');
      } else {
        console.error('Fetch failed:', error);
      }
    }
  
  fetch();
  
}
